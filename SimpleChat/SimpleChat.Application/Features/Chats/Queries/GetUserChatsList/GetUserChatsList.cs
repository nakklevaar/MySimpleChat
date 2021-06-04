using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Interfaces;
using SimpleChat.Core;
using Microsoft.AspNetCore.Http;
using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Features.Chats
{
    public class GetUserChatsListQuerry : IRequest<ChatVm[]>
    {
        public int Start { get; set; } = 0;

        public int Count { get; set; } = 20;
    }

    public class GetUserChatsListHandler : HandlerBase, IRequestHandler<GetUserChatsListQuerry, ChatVm[]>
    {
        public GetUserChatsListHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<ChatVm[]> Handle(GetUserChatsListQuerry request, CancellationToken cancellationToken)
        {
            var chats = await _context.Chats
                .Where(c => c.ChatUsers.Any(cu => cu.UserId == _httpContext.User.Identity.Name))
                .OrderByDescending(c => c.Messages.Max(m => m.CreateDate))
                .Skip(request.Start)
                .Take(request.Count)
                .Include(c => c.ChatUsers)
                .ThenInclude(cu => cu.User)
                .ToArrayAsync(cancellationToken);

            var lastMessages = chats.Select(c =>
                 _context.Messages
                .Where(m => m.ChatId == c.Id)
                .OrderByDescending(x => x.CreateDate)
                .Include(u => u.Sender)
                .First()
            ).ToArray();

            var chatDtos = chats.Select(c => c is { ChatType: ChatType.Duo } ? (ChatDto)_mapper.Map<Chat, DuoChatDto>(c) : _mapper.Map<Chat, GroupChatDto>(c)).ToArray();

            return chatDtos.Select(chat => chat switch
               {
                   DuoChatDto duoChat =>
                       (ChatVm)new DuoChatVm(duoChat)
                       {
                           LastMessage = _mapper.Map<MessageDto>(lastMessages.First(m => m.ChatId == chat.Id)),
                           Peer = chat.Users.First(u => u.Id != _httpContext.User.Identity.Name),
                       },
                   GroupChatDto groupChat =>
                       new GroupChatVm(groupChat)
                       {
                           LastMessage = _mapper.Map<MessageDto>(lastMessages.First(m => m.ChatId == chat.Id)),
                           PeersCount = chat.Users.Count,
                       }
               }).ToArray();
        }
    }
}