using System;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleChat.Application.Interfaces;
using SimpleChat.Infrustructure.Data;

namespace SimpleChat.Infrustructure
{
    public static class DbInit
    {
        public static void InitializeDb(this ISimpleChatStorageContext dbContext, ILogger logger)
        {
            if(dbContext is SimpleChatStorageContext context)
            {
                if (!context.Database.CanConnect())
                {
                    logger.LogInformation("Filling data....");
                    context.Database.Migrate();
                    var str = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "sqlSeed.sql");
                    var scripts = Regex.Split(str, @"\bGO\b");
                    foreach(var s in scripts)
                    {
                        context.Database.ExecuteSqlRaw(s);
                    }
                }
            }
        }

        public static void InitializeDb(this IUserManager manager)
        {
            manager.CreateUserAsync("1","test1", "test@mail.ru", "test").Wait();
            manager.CreateUserAsync("2","test2", "test@mail.ru", "test").Wait();
        }
    }
}
