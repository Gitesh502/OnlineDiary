using MongoDB.Driver;
using OD.Entities;
using OD.Interfaces;
using OD.Interfaces.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Tasks = OD.Entities.Tasks;

namespace OD.Repository.Repository
{
    public class TaskRepository:ITaskRepository
    {
        private readonly IRepository<Tasks, string> repository;
        public TaskRepository()
        {
            this.repository = new MongoRepository<Tasks>();
        }

        public async Task<bool> Add(Tasks Task)
        {
            try
            {
                await repository.SaveAsync(Task);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<List<Entities.Tasks>> Find(FilterDefinition<Tasks> Filter)
        {
            try
            {
                return await repository.GetAsync(Filter);
            }
            catch (Exception ex)
            {
                return new List<Tasks>();
            }
        }
        public async Task<Entities.Tasks> Update(Tasks Diary, FilterDefinition<Tasks> Filter)
        {
            try
            {
                return await repository.UpdateAsync(Filter, Diary);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
