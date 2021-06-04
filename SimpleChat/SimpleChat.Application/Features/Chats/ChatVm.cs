using SimpleChat.Application.Dtos;
using SimpleChat.Core;

namespace SimpleChat.Application.Features.Chats
{
    public abstract class ChatVm
    {
        public ChatVm(ChatDto chatDto)
        {
            Id = chatDto.Id;
            ChatType = chatDto.ChatType;
        }

        public int Id { get; set; }

        public ChatType ChatType { get; set; }

        public MessageDto LastMessage { get; set; }
    }
}
