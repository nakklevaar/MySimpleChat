using System;
using System.Collections.Generic;
using System.Text;
using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Features.Messages
{
    public class ChatMessagesVm
    {
        public UserDto[] Peers { get; set; }

        public LightMessageDto[] Messages { get; set; }
    }
}
