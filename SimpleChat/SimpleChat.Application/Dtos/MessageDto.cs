using System;
using AspNetCoreSpa.Application.Mappings;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class MessageDto : IMapFrom<Message>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public UserDto Sender { get; set; }

        public DateTime CreateDate { get; set; }

        public bool IsRead { get; set; }

        public int ChatId { get; set; }
    }
}
