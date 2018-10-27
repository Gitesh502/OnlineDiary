using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Api.Helpers;
using OD.BLL.Services;
using OD.Entities;

namespace OD.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiaryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDiaryService _diaryService;
        private readonly IOptions<AppSettings> config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string UserId;

        public DiaryController(
          IMapper mapper
          , IDiaryService diaryService
          , IUserService userService
          , IOptions<AppSettings> config
          , IHttpContextAccessor httpContextAccessor)
        {

            _mapper = mapper;
            _diaryService = diaryService;
            this.config = config;
            _httpContextAccessor = httpContextAccessor;
            this.UserId = _httpContextAccessor.HttpContext.Request.Headers["UserId"].FirstOrDefault();

        }

        [Route("Save"),HttpPost]
        public async Task<IActionResult> Save(DiaryRequestModel DiaryRequest)
        {
            try
            {
                DiaryRequest.CreatedBy = this.UserId;
                var DiaryDto = _mapper.Map<Diary>(DiaryRequest);
                var result = await _diaryService.AddDiary(DiaryDto);
                if (result)
                {
                    return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "Diary added successfully" });
                }
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "Something went wrong" });
            }
            catch(Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = ex.InnerException.Message });
            }
        }

        [Route("GetByUserId"),HttpGet]
        public async Task<IActionResult> GetByUserId()
        {
            try
            {
                var diaries= await _diaryService.GetByUserId(this.UserId);
                List<DiaryResponseModel> diariesResponse = _mapper.Map<List<DiaryResponseModel>>(diaries);
                if(diariesResponse.Count()>0)
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "",response= diariesResponse });
                else
                    return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No diaries added by you", response = diariesResponse });
            }
            catch(Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.InnerException.Message });
            }
        }
    } 
}
