using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Api.Helpers;
using OD.BLL.Services;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace OD.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DiaryController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IDiaryService _diaryService;

        public DiaryController(
          IMapper mapper
          , IDiaryService diaryService
          , IUserService userService)
        {
            _mapper = mapper;
            _diaryService = diaryService;
        }

        [Route("Save"),HttpPost]
        public async Task<IActionResult> Save(DiaryRequestModel DiaryRequest)
        {
            try
            {
                DiaryRequest.CreatedBy = this.UserId;
                var DiaryList = await _diaryService.GetByUserId(this.UserId);
                int IsAdded = DiaryList.Where(a => a.CreatedOn.Value.Date == DiaryRequest.CreatedOn.Value.Date).Count();
                if(IsAdded > 0) {
                       return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, type="alert", msg = "You can add one page per day!" });
                }
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

        [Route("Update"), HttpPost]
        public async Task<IActionResult> Update(DiaryRequestModel DiaryRequest)
        {
            try
            {
                DiaryRequest.CreatedBy = this.UserId;
                var DiaryDto = _mapper.Map<Diary>(DiaryRequest);
                var result = await _diaryService.UpdateDiary(DiaryDto);
                if (result!=null)
                {
                    return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "Diary updated successfully",response= result });
                }
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "Something went wrong" });
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = ex.InnerException.Message });
            }
        }
        //[Authorize]
        [Route("GetByUserId"),HttpGet]
        public async Task<IActionResult> GetByUserId()
        {
            try
            {
                
               var x =  this.User.GetUserId();
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

        [Route("GetByPage"),HttpGet]
        public async Task<IActionResult> GetByPage(int PageNo)
        {
            try
            {
                var Page = await _diaryService.GetByPage(PageNo , this.UserId);
                if(Page != null)
                {
                    DiaryResponseModel diariesResponse = _mapper.Map<DiaryResponseModel>(Page);
                    if (diariesResponse!=null)
                        return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "", response = diariesResponse });
                    else
                        return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No diaries with this page number", response = diariesResponse });
                }
                else
                {
                    return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No diaries created by you" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.InnerException.Message });
            }
        }
    } 
}
