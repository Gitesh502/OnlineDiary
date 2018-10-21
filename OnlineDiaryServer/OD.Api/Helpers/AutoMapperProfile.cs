using AutoMapper;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Users, UserRequestModel>();
            CreateMap<UserRequestModel, Users>();
            CreateMap<Users, UserResponseModel>();
        }
    }
}
