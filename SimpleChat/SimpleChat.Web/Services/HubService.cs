using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;
using SimpleChat.Web.Hubs;

namespace SimpleChat.Web.Services
{
    public class HubService : IChatNotifier
    {
        private readonly IHubContext<ChatHub> _hub;
        private readonly HttpContext _httpContext;

        public HubService(IHubContext<ChatHub> hub, IHttpContextAccessor contextAccessor)
        {
            _hub = hub;
            _httpContext = contextAccessor.HttpContext;
        }

        public Task Send(MessageDto message, UserDto[] users)
        {
            var sender = users.First(u => u.Id == _httpContext.User.Identity.Name);
            var sortedUsers = users
                .Except(new[] { sender })
                .Select(u=>u.Id)
                .ToList();
            _hub.Clients.Users(sortedUsers).SendAsync("Receive", message);
            return Task.CompletedTask;
        }

        public Task ShareMarkedMessages(int[] ids, int chatId, string[] users)
        {
            var sender = users.First(u => u == _httpContext.User.Identity.Name);
            var sortedUsers = users
                .Except(new[] { sender })
                .ToList();
            _hub.Clients.Users(sortedUsers).SendAsync("MarkMessages", ids, chatId);
            return Task.CompletedTask;
        }
    }
}
