using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleChat.Application.Features.Friendships;

namespace SimpleChat.Web.Controllers
{
    [Route("api/friends/")]
    [ApiController]
    [Authorize("token")]
    public class FriendshipController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FriendshipController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetFriends([FromQuery(Name = "user_id")] string id)
        {
            return Ok(await _mediator.Send(new GetFriendsQuery() { Id = id }));
        }
    }
}
