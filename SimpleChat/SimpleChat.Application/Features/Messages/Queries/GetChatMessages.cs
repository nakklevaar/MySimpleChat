using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Interfaces;
using SimpleChat.Core;
using SimpleChat.Application.Dtos;
using Microsoft.AspNetCore.Http;

namespace SimpleChat.Application.Features.Messages
{
    public class GetChatMessagesQuerry : IRequest<ChatMessagesVm>
    {
        public int ChatId { get; set; }

        public int Start { get; set; }

        public int Count { get; set; }
    }

    public class GetChatMessagesHandler : HandlerBase, IRequestHandler<GetChatMessagesQuerry, ChatMessagesVm>
    {
        public GetChatMessagesHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<ChatMessagesVm> Handle(GetChatMessagesQuerry request, CancellationToken cancellationToken)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatId == request.ChatId)
                .OrderByDescending(m => m.CreateDate)
                .Skip(request.Start)
                .Take(request.Count)
                .Include(m => m.Sender)
                .ToArrayAsync(cancellationToken);

            var users = messages.GroupBy(m => m.Sender).Select(k => k.Key).ToArray();

            var usersDto = _mapper.Map<User[], UserDto[]>(users);
            var messagesDto = _mapper.Map<Message[], LightMessageDto[]>(messages);

            return new ChatMessagesVm { Messages = messagesDto, Peers = usersDto };
        }
    }
}
