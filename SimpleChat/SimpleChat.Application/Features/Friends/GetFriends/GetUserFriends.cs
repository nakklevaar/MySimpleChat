using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Friendships
{
    public class GetFriendsQuery : IRequest<List<UserDto>>
    {
        public string Id { get; set; }
    }

    public class GetFriendsHandler : HandlerBase, IRequestHandler<GetFriendsQuery, List<UserDto>>
    {
        public GetFriendsHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<List<UserDto>> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
        {
            var friendsAsInitiator = await _context.Friendships
                .Where(u => u.InitiatorUserId == request.Id)
                .Select(u => u.ReceiverUser)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var friendsAsTarget = await _context.Friendships
                .Where(u => u.ReceiverUserId == request.Id)
                .Select(u => u.InitiatorUser)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return friendsAsInitiator.Union(friendsAsTarget).ToList();
        }
    }
}
