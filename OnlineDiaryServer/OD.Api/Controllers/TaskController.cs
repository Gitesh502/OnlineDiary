using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Api.Helpers;
using OD.BLL.Services;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OD.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ITaskService taskService;

        public TaskController(
          IMapper mapper
          , ITaskService taskService
          , IUserService userService
         )
        {
            _mapper = mapper;
            this.taskService = taskService;
        }

        [Route("Save"), HttpPost]
        public async Task<IActionResult> Save(TaskRequestModel taskRequest)
        {
            try
            {
                taskRequest.CreatedBy = this.UserId;
                var taskDto = _mapper.Map<Tasks>(taskRequest);
                var result = await taskService.Add(taskDto);
                if (result)
                {
                    return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "task added successfully" });
                }
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "Something went wrong" });
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = ex.InnerException.Message });
            }
        }

        [Route("Update"), HttpPost]
        public async Task<IActionResult> Update(TaskRequestModel taskRequest)
        {
            try
            {
                taskRequest.CreatedBy = this.UserId;
                var taskDto = _mapper.Map<Tasks>(taskRequest);
                var result = await taskService.Update(taskDto);
                if (result != null)
                {
                    return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "Task updated successfully", response = result });
                }
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "Something went wrong" });
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = ex.InnerException.Message });
            }
        }

        [Route("GetByUserId"), HttpGet]
        public async Task<IActionResult> GetByUserId()
        {
            try
            {
                var tasks = await taskService.GetByUserId(this.UserId);
                List<TaskResponseModel> taskResponse = _mapper.Map<List<TaskResponseModel>>(tasks);
                if (taskResponse.Count() > 0)
                    return Ok(new { status = HttpStatusCode.InternalServerError, valid = true, msg = "", response = taskResponse });
                else
                    return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No tasks added by you", response = taskResponse });
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.InnerException.Message });
            }
        }

        [Route("GetByTaskId"), HttpGet]
        public async Task<IActionResult> GetByTaskId(string TaskId)
        {
            try
            {
                var task = await taskService.GetByTaskId(TaskId, this.UserId);
                if (task != null)
                {
                    TaskResponseModel tasks = _mapper.Map<TaskResponseModel>(task);
                    if (tasks != null)
                        return Ok(new { status = HttpStatusCode.OK, valid = true, msg = "", response = tasks });
                    else
                        return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No tasks with this id", response = tasks });
                }
                else
                {
                    return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = "No tasks created by you" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { status = HttpStatusCode.InternalServerError, valid = false, msg = ex.InnerException.Message });
            }
        }
    }
}
