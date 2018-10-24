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
    public class DiaryRepository: IDiaryRepository
    {
        private readonly IRepository<Diary, string> repository;
        public DiaryRepository()
        {
            this.repository = new MongoRepository<Diary>();
        }

        public async Task<bool> Add(Diary Diary)
        {
            try
            {
                await repository.SaveAsync(Diary);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<List<Diary>> Find(FilterDefinition<Diary> Filter)
        {
            try
            {
                return await repository.GetAsync(Filter);
            }
            catch(Exception ex)
            {
                return new List<Diary>();
            }
        }
    }
}
