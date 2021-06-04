using AspNetCoreSpa.Application.Mappings;
using AutoMapper;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class UserDto : IMapFrom<User>
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsMale { get; set; }

        public string ImageSource { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, UserDto>().ForMember(m => m.ImageSource, opt => opt.MapFrom(value => value.ImageSource ?? "default.jpg"));
        }
    }
}
