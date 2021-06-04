using Microsoft.AspNetCore.Identity;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Data.Identity.Entities
{
    public class ApplicationUser : IdentityUser, IApplicationUser
    {
    }
}
