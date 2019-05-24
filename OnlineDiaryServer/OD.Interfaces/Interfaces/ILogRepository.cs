using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.Interfaces.Interfaces
{
    public interface ILogRepository
    {
        Task<List<Log>> Find(FilterDefinition<Log> Filter);
        Task<Log> FindOne(FilterDefinition<Log> Filter);
        Task<bool> Add(Log log);
        Task<bool> UpdateMany(UpdateDefinition<Log> log, FilterDefinition<Log> Filter);
    }
}
