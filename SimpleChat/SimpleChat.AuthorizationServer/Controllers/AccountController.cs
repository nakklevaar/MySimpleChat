using System.Threading.Tasks;
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

        public AccountController(SignInManager<ApplicationUser> signInManager, IUserManager userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpGet("/")]
        public IActionResult SignIn(string returnUrl)
        {
            ViewBag.Url = returnUrl;
            return View();
        }

        [HttpPost("/")]
        public async Task<IActionResult> SignInAsync(string login, string password, string returnUrl)
        {
            var result = await _signInManager.PasswordSignInAsync(login, password, true, false);

            returnUrl ??= @"https://localhost:5001";

            if (result.Succeeded)
            {
                return Redirect(returnUrl);
            }

            return Content("<a href=\"SignIn\">Failure</a>", "text/html");
        }

        [HttpGet("/account/logout")]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("SignIn");
        }
    }
}
