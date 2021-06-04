using AspNetCoreSpa.Application.Mappings;
using SimpleChat.Core;

namespace SimpleChat.Application.Dtos
{
    public class GroupChatDto : ChatDto, IMapFrom<Chat>
    {
        public string Name { get; set; }

        public string CreatorId { get; set; }

        public string ImageSource { get; set; }
    }
}
