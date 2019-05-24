using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using UAParser;

namespace OD.Api.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        public string UserId ="";
        public readonly IHttpContextAccessor _httpContextAccessor;
        public BaseController()
        {
            _httpContextAccessor = new HttpContextAccessor();
            HttpContext httpContext = _httpContextAccessor.HttpContext;
            UserId = httpContext.User?.Claims?.FirstOrDefault(c => c.Type == "UserId")?.Value;
        }

        
    }
}
