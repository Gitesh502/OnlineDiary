using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public interface ILogService
    {
        Task<Log> Get(string userId);
        Task<bool> Delete(string UserId, string RefreshToken);
        Task<bool> Add(Log log);
        Task<bool> DeleteAll(string UserId);
    }
}
