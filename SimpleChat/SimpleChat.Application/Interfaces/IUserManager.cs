using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SimpleChat.Application.Models;

namespace SimpleChat.Application.Interfaces
{
    public interface IUserManager
    {
        Task<Result<string>> CreateUserAsync(string userName, string email, string password);

        Task<IApplicationUser> GetUserAsync(string login);

        Task<IApplicationUser> GetUserAsync(string login, string password);

        Task<IApplicationUser> GetUserByIdAsync(string id);

        Task<IApplicationUser> GetUserByUserNameAsync(string userName);

        Task<IApplicationUser> GetUserByEmailAsync(string email);
    }
}
