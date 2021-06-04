using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Web.Hubs
{
    public class ChatHub: Hub
    {
        public async Task Send(string message)
        {
            
        }
    }
}
