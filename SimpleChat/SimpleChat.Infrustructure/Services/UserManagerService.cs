using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SimpleChat.Application.Interfaces;
using SimpleChat.Data.Identity.Entities;
using SimpleChat.Application.Models;

namespace SimpleChat.Infrustructure.Services
{
    public class UserManagerService : IUserManager
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserManagerService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public Task<bool> CheckPasswordAsync(string login, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<string>> CreateUserAsync(string userName, string email, string password)
        {
            var user = new ApplicationUser { UserName = userName, Email = email };
            var result = await _userManager.CreateAsync(user, password);

            return result.Succeeded
                ? Result<string>.Success(user.Id)
                : Result<string>.Failure(result.Errors.Select(err => err.Description).ToArray());
        }

        public Task<IApplicationUser> GetUserByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserByUserNameAsync(string userName)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserAsync(string login)
        {
            throw new NotImplementedException();
        }

        public Task<IApplicationUser> GetUserAsync(string login, string password)
        {
            throw new NotImplementedException();
        }
    }
}
