using System;

namespace SimpleChat.Core
{
    public class Message
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public bool IsRead { get; set; }

        public string SenderId { get; set; }

        public User Sender { get; set; }

        public int ChatId { get; set; }

        public Chat Chat { get; set; }
    }
}
