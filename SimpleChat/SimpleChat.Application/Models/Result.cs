using System;
using System.Collections.Generic;
using System.Linq;

namespace SimpleChat.Application.Models
{
    public class Result<T> : Result
    {
        internal Result(bool succeeded, IEnumerable<string> errors, T value) : base(succeeded, errors)
        {
            Value = value;
        }

        public T Value { get; }

        public static Result<T> Success(T value)
        {
            return new Result<T>(true, Array.Empty<string>(), value);
        }

        public static new Result<T> Failure(IEnumerable<string> errors)
        {
            return new Result<T>(false, errors, default);
        }
    }

    public class Result
    {
        internal Result(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        public bool Succeeded { get; }

        public string[] Errors { get; }

        public static Result Success()
        {
            return new Result(true, Array.Empty<string>());
        }

        public static Result Failure(IEnumerable<string> errors)
        {
            return new Result(false, errors);
        }
    }
}
