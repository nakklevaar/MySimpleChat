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
    public class GetChatsByTemplateQuery : IRequest<LightChatVm[]>
    {
        public string Template { get; set; }

        public int Start { get; set; } = 0;

        public int Count { get; set; } = 20;
    }

    public class GetChatsByTemplateHandler : HandlerBase, IRequestHandler<GetChatsByTemplateQuery, LightChatVm[]>
    {
        public GetChatsByTemplateHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<LightChatVm[]> Handle(GetChatsByTemplateQuery request, CancellationToken cancellationToken)
        {
            var chats = await _context.Chats
                .Where(c => c.ChatUsers.Any(cu => cu.UserId == _httpContext.User.Identity.Name) &&
                     c.ChatUsers.Where(cu => cu.UserId != _httpContext.User.Identity.Name)
                                .Any(cu => cu.User.FirstName.StartsWith(request.Template) ||
                                        cu.User.LastName.StartsWith(request.Template)) ||
                    c.Name.StartsWith(request.Template))
                .OrderByDescending(c => c.Messages.Max(m => m.CreateDate))
                .Skip(request.Start)
                .Take(request.Count)
                .Include(c => c.ChatUsers)
                .ThenInclude(cu => cu.User)
                .ToArrayAsync(cancellationToken);

            var chatDtos = chats.Select(c => c is { ChatType: ChatType.Duo } ? (ChatDto)_mapper.Map<Chat, DuoChatDto>(c) : _mapper.Map<Chat, GroupChatDto>(c)).ToArray();

            return chats.Select(chat => chat switch
            {
                { ChatType: ChatType.Duo } =>
                    new LightChatVm
                    {
                        Id = chat.Id,
                        Name = $"{chat.ChatUsers.First(cu => cu.UserId != _httpContext.User.Identity.Name).User.FirstName} " +
                        $"{chat.ChatUsers.First(cu => cu.UserId != _httpContext.User.Identity.Name).User.LastName}",
                        ImageSource = chat.ChatUsers.First(cu => cu.UserId != _httpContext.User.Identity.Name).User.ImageSource
                    },
                { ChatType: ChatType.Group } =>
                    new LightChatVm
                    {
                        Id = chat.Id,
                        Name = chat.Name,
                        ImageSource = chat.ImageSource
                    }
            }).ToArray();
        }
    }
}
