using System.Threading.Tasks;
using SimpleChat.Application.Dtos;

namespace SimpleChat.Application.Interfaces
{
    public interface IChatNotifier
    {
        public Task Send(MessageDto message, UserDto[] users);

        public Task ShareMarkedMessages(int[] ids, int chatId, string[] users);
    }
}
