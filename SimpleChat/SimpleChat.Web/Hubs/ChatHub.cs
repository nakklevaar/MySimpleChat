using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SimpleChat.Web.Hubs
{
    [Authorize]
    public class ChatHub: Hub
    {
    }
}
