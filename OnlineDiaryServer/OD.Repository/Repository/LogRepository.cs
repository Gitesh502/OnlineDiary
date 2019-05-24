using MongoDB.Driver;
using OD.Entities;
using OD.Interfaces;
using OD.Interfaces.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.Repository.Repository
{
    public class LogRepository : ILogRepository
    {
        private readonly IRepository<Log, string> repository;
        public LogRepository()
        {
            this.repository = new MongoRepository<Log>();
        }

        public async Task<bool> Add(Log log)
        {
            try
            {
                await repository.SaveAsync(log);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Log>> Find(FilterDefinition<Log> Filter)
        {
            try
            {
                return await repository.GetAsync(Filter);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Log> FindOne(FilterDefinition<Log> Filter)
        {
            try
            {
                return await repository.GetOneAsync(Filter);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateMany(UpdateDefinition<Log> log, FilterDefinition<Log> Filter)
        {
            try
            {

                 await repository.UpdateManyAsync(Filter, log);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
