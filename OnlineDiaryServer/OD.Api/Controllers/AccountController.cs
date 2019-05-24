using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Api.Helpers;
using OD.BLL.Services;
using OD.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using UAParser;

namespace OD.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IOptions<AppSettings> config;
        private readonly TokenGenerators tokenGenerators;
        private readonly ILogService logService;

        public AccountController(
            IMapper mapper
            , IUserService userService
            , IOptions<AppSettings> config
            , ILogService logService)
        {

            _mapper = mapper;
            _userService = userService;
            this.config = config;
            this.logService = logService;
            tokenGenerators = new TokenGenerators();

        }
        [Route("Register"), HttpPost]
        public async Task<IActionResult> Create(UserRequestModel UserRequest)
        {
            try
            {
                string Salt = SecureUtility.GetSalt();
                string ModifiedSalt = UserRequest.Password + Salt;
                string HashPassword = SecureUtility.GetHash(ModifiedSalt);
                UserRequest.PasswordHash = HashPassword;
                UserRequest.Salt = Salt;
                var UserDtos = _mapper.Map<Users>(UserRequest);
                bool result = await _userService.CreateUser(UserDtos);
                if (result)
                {
                    //return Ok();
                    return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "You have been successfully registered" });
                }
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "Something went wrong" });

            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = ex.InnerException.Message });

            }
            // return new HttpResponseMessage(HttpStatusCode.InternalServerError);
        }


        [Route("Login"), HttpPost]
        public async Task<IActionResult> Login([FromBody]UserRequestModel userParam)
        {
            try
            {
                var user = await _userService.Authenticate(userParam.Email, userParam.Password);
                if (user == null)
                    return BadRequest(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "Username or Password is incorrect" });

                var UserDtos = _mapper.Map<UserResponseModel>(user);
                var claims = new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim("UserId", user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())

                    };
                string refreshToken = tokenGenerators.GenerateRefreshToken();
                string jwtRoken = tokenGenerators.GenerateJwtToken(claims, config);
                await logService.DeleteAll(UserDtos.Id);
                await logService.Add(CreateLog(UserDtos.Id, refreshToken));
                var result = new
                {
                    UserDtos.FullName,
                    Token = jwtRoken,
                    RefreshToken = refreshToken
                };
                return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "You have been logged successfully!", response = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.Message + ex.InnerException?.Message });
            }

        }


        public Log CreateLog(string UserId, string RefreshToken)
        {
            Log log = new Log();
            HttpContext httpContext = this._httpContextAccessor.HttpContext;
            log.RemoteIp = httpContext.Connection.RemoteIpAddress.ToString();
            log.LocalIp = httpContext.Connection.LocalIpAddress.ToString();
            log.UserId = UserId;
            log.Type = "Auth";
            log.RefreshToken = RefreshToken;
            log.ExpiryDate = DateTime.Now.AddDays(7);
            log.IsActive = true;
            var userAgent = httpContext.Request.Headers["User-Agent"];
            string uaString = Convert.ToString(userAgent[0]);
            var uaParser = Parser.GetDefault();
            var cInfo = uaParser.Parse(uaString);
            log.OS = cInfo.OS.Family;
            log.OS_Version = cInfo.OS.Major;
            log.Device = cInfo.Device.Family;
            log.Device_Version = cInfo.Device.Model;
            log.Browser = cInfo.UA.Family;
            log.Browser_Version = cInfo.UA.Major;

            return log;
        }

        [Route("Refresh"), HttpPost]
        public async Task<IActionResult> Refresh(TokenRequestModel tokenRequest)
        {
            try
            {
                var principal = tokenGenerators.GetPrincipalFromExpiredToken(tokenRequest.Token, config.Value.Secret);
                var userId = principal.Claims?.FirstOrDefault(c => c.Type == "UserId")?.Value;
                var log = await logService.Get(userId);
                var savedRefreshToken = log.RefreshToken; //retrieve the refresh token from a data store
                if (savedRefreshToken != tokenRequest.RefreshToken)
                    throw new SecurityTokenException("Invalid refresh token");

                var newJwtToken = tokenGenerators.GenerateJwtToken(principal.Claims, config);
                var newRefreshToken = tokenGenerators.GenerateRefreshToken();
                await logService.Delete(userId, tokenRequest.RefreshToken);
                await logService.Add(CreateLog(userId, newRefreshToken));
                var response = new
                {
                    token = newJwtToken,
                    refreshToken = newRefreshToken
                };
                return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "", response = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.Message + ex.InnerException?.Message });
            }
        }



    }
}
