using System.Collections.Generic;

namespace SimpleChat.Core
{
    public class Chat
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ChatType ChatType { get; init; }

        public string CreatorId { get; set; }

        public string ImageSource { get; set; }

        public List<Message> Messages { get; set; }

        public List<ChatUser> ChatUsers { get; set; }
    }
}