using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Chats
{
    public class MessageAdded : INotification
    {
        public MessageDto Message { get; set; }
    }

    public class NotifyClients : HandlerBase, INotificationHandler<MessageAdded>
    {
        private readonly IChatNotifier _hub;

        public NotifyClients(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor, IChatNotifier hub) : base(context, mapper, mediator, httpContextAccessor)
        {
            _hub = hub;
        }

        public async Task Handle(MessageAdded notification, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                    .Where(u => u.ChatUsers.Any(cu => cu.ChatId == notification.Message.ChatId))
                    .Include(e => e.ChatUsers)
                    .ThenInclude(e => e.Chat)
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .ToArrayAsync(cancellationToken);

            await _hub.Send(notification.Message, users);
        }
    }
}
