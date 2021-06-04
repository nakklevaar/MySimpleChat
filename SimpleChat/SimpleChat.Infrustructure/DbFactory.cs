using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SimpleChat.Data.Identity;
using SimpleChat.Infrustructure.Data;

namespace SimpleChat.Infrustructure
{
    public class DbFactory1 : IDesignTimeDbContextFactory<SimpleChatStorageContext>
    {
        public SimpleChatStorageContext CreateDbContext(string[] args)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<SimpleChatStorageContext>();
            builder.UseSqlServer(configuration["Data:connectionString"]);

            return new SimpleChatStorageContext(builder.Options);
        }
    }

    public class DbFactory2 : IDesignTimeDbContextFactory<IdentityContext>
    {
        IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

        public IdentityContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<IdentityContext>();
            builder.UseSqlServer(configuration["Data:connectionString"]);

            return new IdentityContext(builder.Options);
        }
    }
}
