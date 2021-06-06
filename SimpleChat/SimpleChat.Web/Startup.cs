using System;
using System.Collections.Specialized;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using SimpleChat.Application;
using SimpleChat.Application.Interfaces;
using SimpleChat.Infrustructure;
using SimpleChat.Web.Hubs;
using SimpleChat.Web.Services;

namespace SimpleChat.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddInfrustructure()
                .AddApplication()
                .AddPersistence(Configuration);

            services
                .AddAuthentication(options =>
                {
                    options.DefaultScheme = "Cookies";
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(opt =>
                {
                    opt.Authority = "https://localhost:10001";
                    opt.Audience = "simpleChatStorage";
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidateAudience = false,
                        NameClaimType = ClaimTypes.NameIdentifier
                    };
                })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                {
                    options.Cookie.Name = "mvc";
                })
                .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
                {
                    options.Authority = "https://localhost:10001";
                    options.ClientId = "mvc";
                    options.ClientSecret = "secret";
                    options.ResponseType = "code";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        NameClaimType = ClaimTypes.NameIdentifier
                    };
                    options.SaveTokens = true;
                    options.Events = new OpenIdConnectEvents
                    {
                        OnTicketReceived = context =>
                        {
                            context.Properties.IsPersistent = true;
                            context.Properties.ExpiresUtc = DateTimeOffset.UtcNow.AddDays(15);
                            context.Properties.AllowRefresh = true;

                            return Task.CompletedTask;
                        }
                    };
                });

            services
                .AddAuthorization(options =>
                {
                    options.AddPolicy("token", policy =>
                    {
                        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                        policy.RequireAuthenticatedUser();
                    });

                    options.AddPolicy("cookie", policy =>
                    {
                        policy.AddAuthenticationSchemes(CookieAuthenticationDefaults.AuthenticationScheme);
                        policy.RequireAuthenticatedUser();
                    });
                });

            services
                .AddControllersWithViews()
                .AddRazorRuntimeCompilation()
                .AddNewtonsoftJson();

            services.
                AddSignalR();

            services.AddScoped<IChatNotifier, HubService>();

            services
                .AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/build";
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chathub");
                endpoints.MapControllers();
            });

            app.Use(async (context, next) => 
                await (!context.User.Identity.IsAuthenticated ? context.ChallengeAsync() : next()));

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
