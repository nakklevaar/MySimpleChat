using System.Collections.Generic;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public abstract class ChatDto
    {
        public int Id { get; set; }

        public ChatType ChatType { get; set; }

        public List<UserDto> Users { get; set; }
    }
}
