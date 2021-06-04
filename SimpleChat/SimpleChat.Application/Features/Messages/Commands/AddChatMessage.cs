using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SimpleChat.Application.Dtos;
using SimpleChat.Application.Features.Chats;
using SimpleChat.Application.Interfaces;
using SimpleChat.Core;

namespace SimpleChat.Application.Features.Messages
{
    public class AddChatMessageCommand: IRequest<MessageDto>
    {
        public int ChatId { get; set; }

        public string SenderId { get; set; }

        public DateTime CreateDate { get; set; }

        public string Content { get; set; }
    }

    public class AddChatMessageHandler : HandlerBase ,IRequestHandler<AddChatMessageCommand, MessageDto>
    {
        public AddChatMessageHandler(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(context, mapper, mediator, httpContextAccessor)
        {
        }

        public async Task<MessageDto> Handle(AddChatMessageCommand request, CancellationToken cancellationToken)
        {
            var message = _context.Messages.Add(new Message { ChatId = request.ChatId, SenderId = request.SenderId, CreateDate = request.CreateDate, Content = request.Content });

            _context.Users.Where(u => u.Id == request.SenderId).Load();
            await _context.SaveChangesAsync(cancellationToken);

            var messageDto = _mapper.Map<Message, MessageDto>(message.Entity);

            await _mediator.Publish(new MessageAdded { Message = messageDto }, cancellationToken);

            return messageDto;
        }
    }
}
