using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SimpleChat.Application.Features.Profiles;

namespace SimpleChat.Web.Controllers
{
    [Route("api/profile/")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            return Ok(await _mediator.Send(new GetProfileQuery { Id = id }));
        }
    }
}
