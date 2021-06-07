using System.Threading.Tasks;
using SimpleChat.Application.Models;

namespace SimpleChat.Application.Interfaces
{
    public interface IUserManager
    {
        Task<Result<string>> CreateUserAsync(string id, string userName, string email, string password);
    }
}
