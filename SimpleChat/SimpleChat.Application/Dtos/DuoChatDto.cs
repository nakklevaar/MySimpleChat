using System.Linq;
using AspNetCoreSpa.Application.Mappings;
using AutoMapper;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class DuoChatDto : ChatDto, IMapFrom<Chat>
    {
        private void Mapping(Profile profile)
        {
            profile.CreateMap<Chat, DuoChatDto>().ForMember(m => m.Users, opt => opt.MapFrom(m => m.ChatUsers.Select(cu => cu.User)));
        }
    }
}
