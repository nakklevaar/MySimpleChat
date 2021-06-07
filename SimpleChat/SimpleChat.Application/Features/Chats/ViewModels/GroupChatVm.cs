using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Features.ViewModels.Chats
{
    public class GroupChatVm : ChatVm
    {
        public GroupChatVm(GroupChatDto chatDto) : base(chatDto)
        {
            Name = chatDto.Name;
            CreatorId = chatDto.CreatorId;
            ImageSource = chatDto.ImageSource;
        }

        public string Name { get; set; }

        public string CreatorId { get; set; }

        public string ImageSource { get; set; }

        public UserDto[] Peers { get; set; }

        public int PeersCount { get; set; }
    }
}
