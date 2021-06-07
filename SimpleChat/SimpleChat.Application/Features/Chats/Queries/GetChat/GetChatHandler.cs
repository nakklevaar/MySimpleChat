using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Features.ViewModels.Chats;
using SimpleChat.Application.Interfaces;
using SimpleChat.Core;

namespace SimpleChat.Application.Features.Chats
{
    public class GetChatQuery : IRequest<ChatVm>
    {
        public int Id { get; set; }
    }

    public class GetChatHandler : HandlerBase, IRequestHandler<GetChatQuery, ChatVm>
    {
        public GetChatHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<ChatVm> Handle(GetChatQuery request, CancellationToken cancellationToken)
        {
            var chat = await _context.Chats
                .Include(c => c.ChatUsers)
                .ThenInclude(cu => cu.User)
                .FirstAsync(c => c.Id == request.Id, cancellationToken);

            var lastMessage = await _context.Messages
                .Where(m => m.ChatId == request.Id)
                .OrderByDescending(c => c.CreateDate)
                .Include(u => u.Sender)
                .FirstAsync(cancellationToken);

            var chatDto = chat is { ChatType: ChatType.Duo } ? (ChatDto)_mapper.Map<Chat, DuoChatDto>(chat) : _mapper.Map<Chat, GroupChatDto>(chat);

            return chatDto switch
            {
                DuoChatDto duoChat =>
                    (ChatVm)new DuoChatVm(duoChat)
                    {
                        LastMessage = _mapper.Map<MessageDto>(lastMessage),
                        Peer = chatDto.Users.First(u => u.Id != _httpContext.User.Identity.Name),
                    },
                GroupChatDto groupChat =>
                    new GroupChatVm(groupChat)
                    {
                        LastMessage = _mapper.Map<MessageDto>(lastMessage),
                        PeersCount = chatDto.Users.Count,
                    }
            };
        }
    }
}
