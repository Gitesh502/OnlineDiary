using MongoDB.Driver;
using OD.Entities;
using OD.Interfaces;
using OD.Interfaces.Interfaces;
using OD.Repository.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.Repository.Repository
{
    public class UserRepository:IUserRepository
    {
        //private readonly DbContext db;
        private readonly IRepository<Users, string> repository;
        public UserRepository() 
        {
            //this.db = new DbContext();
            this.repository = new MongoRepository<Users>();
        }

        public async Task<bool> Insert(Users User)
        {
            try
            {
                await repository.SaveAsync(User);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<Users> Find(FilterDefinition<Users> Filter)
        {
            try
            {
                return await repository.GetOneAsync(Filter);
            }
            catch(Exception ex)
            {
                return new Users();
            }
        }

    }
}
