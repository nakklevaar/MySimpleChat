using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleChat.Application.Features.Chats;
using SimpleChat.Web.Attributes;

namespace SimpleChat.Web.Controllers
{
    [Route("api/chats")]
    [ApiController]
    [Authorize("token")]
    public class ChatController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ChatController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetList(int start = 0, int count = 20)
        {
            return Ok(await _mediator.Send(new GetUserChatsListQuerry { Start = start, Count = count }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _mediator.Send(new GetChatQuery { Id = id }));
        }

        [RequiredQueryHttpGet(WithQuery: "template")]
        public async Task<IActionResult> GetByTemplate(string template)
        {
            return Ok(await _mediator.Send(new GetChatsByTemplateQuery { Template = template }));
        }
    }
}