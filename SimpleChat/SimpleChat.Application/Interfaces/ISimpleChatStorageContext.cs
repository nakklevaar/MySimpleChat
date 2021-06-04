using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Core;

namespace SimpleChat.Application.Interfaces
{
    public interface ISimpleChatStorageContext
    {
        DbSet<User> Users { get; set; }

        DbSet<Message> Messages { get; set; }

        DbSet<Chat> Chats { get; set; }

        DbSet<Friendship> Friendships { get; set; }

        DbSet<UserProfile> UserProfiles { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
