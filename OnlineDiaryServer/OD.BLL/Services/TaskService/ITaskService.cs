using System.Collections.Generic;
using System.Threading.Tasks;
using OD.Entities;

namespace OD.BLL.Services
{
    public interface ITaskService
    {
        Task<bool> Add(Tasks Task);
        Task<Tasks> GetByTaskId(string TaskId,string UserId);
        Task<List<Tasks>> GetByUserId(string UserId);
        Task<Tasks> Update(Tasks Task);
    }
}