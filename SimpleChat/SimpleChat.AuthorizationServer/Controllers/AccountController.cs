using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SimpleChat.Application.Interfaces;
using SimpleChat.Data.Identity.Entities;

namespace SimpleChat.AuthorizationServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserManager _userManager;
        private readonly IIdentityServerInteractionService _interactionService;

        public AccountController(SignInManager<ApplicationUser> signInManager, IUserManager userManager, IIdentityServerInteractionService interactionService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _interactionService = interactionService;
        }

        [HttpGet("/")]
        public IActionResult SignIn(string returnUrl)
        {
            ViewBag.Url = returnUrl;
            return View();
        }

        [HttpPost("/")]
        public async Task<IActionResult> SignIn(string login, string password, string returnUrl)
        {
            var result = await _signInManager.PasswordSignInAsync(login, password, true, false);

            if (result.Succeeded)
            {
                return Redirect(returnUrl);
            }

            return Content("<a href=\"SignIn\">Failure</a>", "text/html");
        }

        [HttpGet("/account/logout")]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await HttpContext.SignOutAsync("Identity.Application");
            await HttpContext.SignOutAsync(IdentityServerConstants.DefaultCookieAuthenticationScheme);
            var context = await _interactionService.GetLogoutContextAsync(logoutId);
            
            return Redirect(context.PostLogoutRedirectUri);
        }
    }
}
