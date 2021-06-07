using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Features.ViewModels.Chats
{
    public class DuoChatVm : ChatVm
    {
        public DuoChatVm(DuoChatDto chatDto) : base(chatDto)
        {
        }

        public UserDto Peer { get; set; }
    }
}
