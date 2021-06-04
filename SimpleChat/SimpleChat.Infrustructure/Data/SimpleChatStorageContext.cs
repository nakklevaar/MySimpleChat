using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Interfaces;
using SimpleChat.Core;

namespace SimpleChat.Infrustructure.Data
{
    public class SimpleChatStorageContext : DbContext, ISimpleChatStorageContext
    {
        public SimpleChatStorageContext(DbContextOptions<SimpleChatStorageContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Friendship> Friendships { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(SimpleChatStorageContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
