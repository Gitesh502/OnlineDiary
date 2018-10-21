using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace OD.Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IOptions<AppSettings> config;


        public AccountController(
            IMapper mapper
            , IUserService userService
            , IOptions<AppSettings> config)
        {
            _mapper = mapper;
            _userService = userService;
            this.config = config;

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
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(config.Value.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, UserDtos.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                UserDtos.Token = tokenHandler.WriteToken(token);
                return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "You have been logged successfully!",response = UserDtos });
            }
            catch(Exception ex)
            {
                return BadRequest(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.Message+ex.InnerException?.Message });
            }
            
        }

    }
}
