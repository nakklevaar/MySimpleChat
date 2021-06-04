using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Messages
{
    public class MessageWasRead : INotification
    {
        public int[] Ids { get; set; }

        public int ChatId { get; set; }
    }

    public class NotifyClients : HandlerBase, INotificationHandler<MessageWasRead>
    {
        private readonly IChatNotifier _hub;

        public NotifyClients(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor, IChatNotifier hub) : base(context, mapper, mediator, httpContextAccessor)
        {
            _hub = hub;
        }

        public async Task Handle(MessageWasRead notification, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                    .Where(u => u.ChatUsers.Any(cu => cu.ChatId == notification.ChatId))
                    .Include(e => e.ChatUsers)
                    .ThenInclude(e => e.Chat)
                    .Select(u=>u.Id)
                    .ToArrayAsync(cancellationToken);
            await _hub.ShareMarkedMessages(notification.Ids, notification.ChatId, users);
        }
    }
}
