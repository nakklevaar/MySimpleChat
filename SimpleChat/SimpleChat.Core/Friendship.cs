namespace SimpleChat.Core
{
    public class Friendship
    {
        public string InitiatorUserId { get; set; }

        public User InitiatorUser { get; set; }

        public string ReceiverUserId { get; set; }

        public User ReceiverUser { get; set; }

        public FriendshipStatus FriendshipStatus { get; set; }
    }
}
