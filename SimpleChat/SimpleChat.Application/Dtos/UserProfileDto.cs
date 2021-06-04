using System;
using AspNetCoreSpa.Application.Mappings;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class UserProfileDto : IMapFrom<UserProfile>
    {
        public string Id { get; set; }

        public DateTime Birthday { get; set; }

        public string Country { get; set; }

        public string City { get; set; }
    }
}
