using System.Collections.Generic;

namespace SimpleChat.Core
{
    public class User
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsMale { get; set; }

        public string ImageSource { get; set; }

        public List<ChatUser> ChatUsers { get; set; }

        public List<Friendship> FriendsAsInitiator { get; set; }

        public List<Friendship> FriendsAsTarget { get; set; }
    }
}