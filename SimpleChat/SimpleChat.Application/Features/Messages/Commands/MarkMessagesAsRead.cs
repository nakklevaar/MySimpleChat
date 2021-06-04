using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Messages
{
    public class MarkMessagesAsReadCommand : IRequest<Unit>
    {
        public int[] Ids { get; set; }
    }

    public class MarkMessagesAsReadHandler : HandlerBase, IRequestHandler<MarkMessagesAsReadCommand, Unit>
    {
        public MarkMessagesAsReadHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<Unit> Handle(MarkMessagesAsReadCommand request, CancellationToken cancellationToken)
        {
            var chatId = -1;
            _context.Messages.Where(m => request.Ids.Contains(m.Id)).ToList().ForEach(m => { m.IsRead = true; chatId = m.ChatId; });
            await _context.SaveChangesAsync(cancellationToken);
            await _mediator.Publish(new MessageWasRead { ChatId = chatId, Ids = request.Ids }, cancellationToken);
            return Unit.Value;
        }
    }
}
