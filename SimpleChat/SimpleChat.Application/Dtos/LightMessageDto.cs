using System;
using AspNetCoreSpa.Application.Mappings;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class LightMessageDto : IMapFrom<Message>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string SenderId { get; set; }

        public DateTime CreateDate { get; set; }

        public bool IsRead { get; set; }

        public int ChatId { get; set; }
    }
}
