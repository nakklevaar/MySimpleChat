using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SimpleChat.Web.Controllers
{
    public class AccountController : Controller
    {
        [Route("refresh")]
        [Authorize("cookie")]
        public IActionResult Refresh()
        {
            return View();
        }

        [Route("logout")]
        [Authorize("cookie")]
        public IActionResult Logout()
        {
            return SignOut(CookieAuthenticationDefaults.AuthenticationScheme, OpenIdConnectDefaults.AuthenticationScheme);
        }
    }
}
