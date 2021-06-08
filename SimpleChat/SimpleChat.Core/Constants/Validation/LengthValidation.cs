namespace SimpleChat.Core.Constants.Validation
{
    public static class LengthValidation
    {
        public static class User
        {
            public const int Id = 15;
            public const int FirstName = 20;
            public const int LastName = 20;
        }

        public static class Chat
        {
            public const int Name = 20;
        }

        public static class ApplicationUser
        {
            public const int UserName = 15;
            public const int Email = 256;
            public const int PhoneNumber = 15;
            public const int Password = 30;
        }

        public static class UserProfile
        {
            public const int City = 20;
            public const int Country = 20;
        }
    }
}
