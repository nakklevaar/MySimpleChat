using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features.Profiles
{
    public class GetProfileQuery : IRequest<UserProfileDto>
    {
        public string Id { get; set; }
    }

    public class GetProfileHandler : HandlerBase, IRequestHandler<GetProfileQuery, UserProfileDto>
    {
        public GetProfileHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<UserProfileDto> Handle(GetProfileQuery request, CancellationToken cancellationToken)
        {
            var profile = await _context.UserProfiles
                .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

            return _mapper.Map<UserProfileDto>(profile);
        }
    }
}
