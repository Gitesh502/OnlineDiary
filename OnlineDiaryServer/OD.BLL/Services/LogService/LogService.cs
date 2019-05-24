using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public class LogService : ILogService
    {
        public async Task<bool> Add(Log log)
        {
            try
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    log.IsActive = true;
                    var result = await db.Log.Add(log);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public async Task<bool> Delete(string UserId, string RefreshToken)
        {
            try
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    var logs = await GetMany(UserId);
                    logs.ForEach(a => a.IsActive = false);

                    FilterDefinition<Log> filter =
                        Builders<Log>.Filter.Eq("UserId", UserId) & Builders<Log>.Filter.Eq("RefreshToken", RefreshToken);

                    UpdateDefinition<Log> update =
                        Builders<Log>.Update.Set("IsActive", false);

                    var result = await db.Log.UpdateMany(update, filter);
                    return result;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        public async Task<bool> DeleteAll(string UserId)
        {
            try
            {
                using (UnitOfWork db = new UnitOfWork())
                {
                    var logs = await GetMany(UserId);
                    logs.ForEach(a => a.IsActive = false);

                    FilterDefinition<Log> filter =
                        Builders<Log>.Filter.Eq("UserId", UserId);

                    UpdateDefinition<Log> update =
                        Builders<Log>.Update.Set("IsActive", false);

                    var result = await db.Log.UpdateMany(update, filter);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Log> Get(string userId)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                FilterDefinition<Log> filter =
                    Builders<Log>.Filter.Eq("UserId", userId) & Builders<Log>.Filter.Eq("IsActive", true);
                var result = await db.Log.FindOne(filter);
                if (result != null)
                {
                    return result;
                }
            }
            return null;
        }


        public async Task<List<Log>> GetMany(string userId)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                FilterDefinition<Log> filter =
                    Builders<Log>.Filter.Eq("UserId", userId);
                var result = await db.Log.Find(filter);
                if (result != null)
                {
                    return result;
                }
            }
            return null;
        }
    }
}
