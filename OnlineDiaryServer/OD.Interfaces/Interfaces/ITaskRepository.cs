using MongoDB.Driver;
using OD.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tasks = OD.Entities.Tasks;

namespace OD.Interfaces.Interfaces
{
    public interface ITaskRepository
    {
        Task<bool> Add(Tasks Diary);
        Task<List<Entities.Tasks>> Find(FilterDefinition<Tasks> Filter);
        Task<Entities.Tasks> Update(Tasks Diary, FilterDefinition<Tasks> Filter);
    }
}
