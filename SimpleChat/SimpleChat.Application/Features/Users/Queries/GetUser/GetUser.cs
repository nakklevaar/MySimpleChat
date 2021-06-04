using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Users
{
    public class GetUserQuery : IRequest<UserDto>
    {
        public string Id { get; set; }
    }

    public class GetUserHandler : HandlerBase, IRequestHandler<GetUserQuery, UserDto>
    {
        public GetUserHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

            return _mapper.Map<UserDto>(user);
        }
    }
}
