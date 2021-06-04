using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleChat.Application.Features.Messages;

namespace SimpleChat.Web.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MessagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery(Name = "chat_id")] int chatId, int start = 0, int count = 10)
        {
            return Ok(await _mediator.Send(new GetChatMessagesQuerry { ChatId = chatId, Start = start, Count = count }));
        }

        [HttpPost]
        public async Task<IActionResult> AddMessage(AddChatMessageCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPatch]
        public async Task<IActionResult> MarkMessagesAsRead(int[] ids)
        {
            await _mediator.Send(new MarkMessagesAsReadCommand { Ids = ids });
            return NoContent();
        }
    }
}
