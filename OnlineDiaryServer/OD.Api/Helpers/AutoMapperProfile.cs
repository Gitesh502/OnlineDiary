using AutoMapper;
using OD.Api.ApiModels.Request;
using OD.Api.ApiModels.Response;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Tasks = OD.Entities.Tasks;

namespace OD.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            
            CreateMap<Users, UserRequestModel>();
            CreateMap<UserRequestModel, Users>();
            CreateMap<Users, UserResponseModel>();
            CreateMap<Diary, DiaryResponseModel>();
            CreateMap<DiaryRequestModel, Diary>();
            CreateMap<TaskRequestModel, Tasks>();
        }

       
    }

    public static class AutoMapperExtensions
    {
        public static IMappingExpression<TSource, TDestination>
          IgnoreAllNonExisting<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression)
        {
            var sourceType = typeof(TSource);
            var destinationType = typeof(TDestination);
            var existingMaps = Mapper.Configuration.GetAllTypeMaps().First(x => x.SourceType.Equals(sourceType) && x.DestinationType.Equals(destinationType));
            foreach (var property in existingMaps.GetUnmappedPropertyNames())
            {
                expression.ForMember(property, opt => opt.Ignore());
            }
            return expression;
        }
    }


}
