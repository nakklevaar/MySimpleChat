using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using SimpleChat.Application.Interfaces;

namespace SimpleChat.Application.Features
{
    public abstract class HandlerBase
    {
        protected readonly ISimpleChatStorageContext _context;
        protected readonly IMapper _mapper;
        protected readonly IMediator _mediator;
        protected readonly HttpContext _httpContext;

        public HandlerBase(ISimpleChatStorageContext context, IMapper mapper, IMediator mediator, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _mediator = mediator;
            _httpContext = httpContextAccessor.HttpContext;
        }
    }
}
