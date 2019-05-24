using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasks = OD.Entities.Tasks;
namespace OD.BLL.Services
{
    public class TaskService : ITaskService
    {
        public async Task<bool> Add(Tasks Task)
        {
            using (var db = new UnitOfWork())
            {
                bool result = false;
                result = await db.Task.Add(Task);
                return result;
            }
        }

        public async Task<Entities.Tasks> Update(Tasks Task)
        {
            using (var db = new UnitOfWork())
            {
                FilterDefinition<Tasks> Filtrer = Builders<Tasks>.Filter.Eq(a => a.Id, Task.Id);
                return await db.Task.Update(Task, Filtrer);
            }
        }

        public async Task<List<Entities.Tasks>> GetByUserId(string UserId)
        {
            using (var db = new UnitOfWork())
            {
                List<Tasks> tasks = new List<Tasks>();
                FilterDefinition<Tasks> Filtrer = Builders<Tasks>.Filter.Eq(a => a.CreatedBy, UserId);
                tasks = await db.Task.Find(Filtrer);
                return tasks;
            }
        }

        public async Task<Entities.Tasks> GetByTaskId(string TaskId,string UserId)
        {
            using (var db = new UnitOfWork())
            {
                List<Tasks> tasks = new List<Tasks>();
                FilterDefinition<Tasks> Filtrer = 
                    Builders<Tasks>.Filter.Eq(a => a.Id, TaskId) & Builders<Tasks>.Filter.Eq(b=>b.CreatedBy,UserId);
                tasks = await db.Task.Find(Filtrer);
                return tasks.FirstOrDefault();
            }
        }
    }
}
