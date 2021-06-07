using System;
using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleChat.Application.Interfaces;
using SimpleChat.Data.Identity;
using SimpleChat.Data.Identity.Entities;
using SimpleChat.Infrustructure.Data;
using SimpleChat.Infrustructure.Services;

namespace SimpleChat.Infrustructure
{
    public static class InfrustructureExtensions
    {
        public static IServiceCollection AddInfrustructure(this IServiceCollection services)
        {
            services
                .AddHttpContextAccessor()
                .AddCors();

            return services;
        }

        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddDbContext<ISimpleChatStorageContext, SimpleChatStorageContext>(options =>
                {
                    options.UseSqlServer(configuration["Data:connectionString"]);
                });

            return services;
        }

        public static IServiceCollection AddAuthServer(this IServiceCollection services)
        {
            services
                .AddDbContext<IdentityContext>(options =>
                {
                    options.UseInMemoryDatabase("AuthStore");
                });

            services
                .AddIdentityCore<ApplicationUser>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 0;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                })
                .AddSignInManager()
                .AddEntityFrameworkStores<IdentityContext>();

            services
                .AddAuthentication()
                .AddCookie("Identity.Application", options =>
                {
                    options.LogoutPath = "/account/logout";
                    options.ExpireTimeSpan = TimeSpan.FromDays(15);
                });

            services
                .AddIdentityServer(options => options.UserInteraction.LoginUrl = "/")
                .AddAspNetIdentity<ApplicationUser>()
                .AddDeveloperSigningCredential()
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryClients(Config.Clients);


            services
                .AddScoped<IApplicationUser, ApplicationUser>()
                .AddScoped<IUserManager, UserManagerService>();

            return services;
        }
    }

    public static class Config
    {
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("simpleChatStorage", "simpleChatStorageApi")
            };

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "simpleChatJS",
                    RequireClientSecret = false,
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedCorsOrigins = { "https://localhost:5001","https://localhost:10001" },
                    RedirectUris = { "https://localhost:5001/callback" , "https://localhost:5001/refresh"},
                    AccessTokenLifetime = 10,
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "simpleChatStorage"
                    },
                    AllowOfflineAccess = true
                },
                new Client
                {
                    ClientId = "mvc",
                    ClientSecrets = { new Secret("secret".Sha256()) },
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = { "https://localhost:5001/signin-oidc"},
                    PostLogoutRedirectUris = { "https://localhost:5001/signout-callback-oidc" },
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                }
            };

        public static IEnumerable<IdentityResource> IdentityResources =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
    }
}
