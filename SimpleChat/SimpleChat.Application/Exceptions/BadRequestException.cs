using System;

namespace SimpleChat.Application.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(params string[] errors) : base(errors[0])
        {
            Errors = errors;
        }

        public string[] Errors { get; }
    }
}
