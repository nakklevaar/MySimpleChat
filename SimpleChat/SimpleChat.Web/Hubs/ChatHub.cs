using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Web.Hubs
{
    [Authorize]
    public class ChatHub: Hub
    {
    }
}
