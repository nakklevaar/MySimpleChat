using System;
using System.Collections.Generic;
using System.Text;
using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Features.Chats
{
    public class DuoChatVm : ChatVm
    {
        public DuoChatVm(DuoChatDto chatDto) : base(chatDto)
        {
        }

        public UserDto Peer { get; set; }
    }
}
