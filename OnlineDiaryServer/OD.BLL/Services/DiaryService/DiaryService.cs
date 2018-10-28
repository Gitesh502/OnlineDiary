using MongoDB.Driver;
using OD.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public class DiaryService : IDiaryService
    {
        public async Task<bool> AddDiary(Diary Diary)
        {
            using (var db = new UnitOfWork())
            {
                bool result = false;
                long LastPageNo = 0;
                var DiaryList = await GetByUserId(Diary.CreatedBy);
                if (DiaryList.Count() > 0)
                    LastPageNo = DiaryList.Select(a => a.PageNo).Max();
                Diary.PageNo = LastPageNo + 1;
                if (Diary.Title == null || Diary.Title == "")
                {
                    Diary.Title = "Page " + (LastPageNo + 1);
                }
                int IsAdded = DiaryList.Where(a => a.CreatedOn.Value.Date.Equals(Diary.CreatedOn.Value.Date)).Count();
                if (IsAdded == 0)
                    result = await db.Diary.Add(Diary);
                return result;
            }
        }
        public async Task<List<Diary>> GetByUserId(string UserId)
        {
            using (var db = new UnitOfWork())
            {
                List<Diary> diaries = new List<Diary>();
                FilterDefinition<Diary> Filtrer = Builders<Diary>.Filter.Eq(a => a.CreatedBy, UserId);
                diaries = await db.Diary.Find(Filtrer);
                return diaries;
            }
        }
        public async Task<Diary> GetByPage(int PageNo, string UserId)
        {
            using (var db = new UnitOfWork())
            {
                List<Diary> diaries = new List<Diary>();
                FilterDefinition<Diary> Filtrer =
                    Builders<Diary>.Filter.Eq(a => a.CreatedBy, UserId) & Builders<Diary>.Filter.Eq(a => a.PageNo, PageNo);
                diaries = await db.Diary.Find(Filtrer);
                return diaries.FirstOrDefault();
            }
        }
        public async Task<Diary> UpdateDiary(Diary Diary)
        {
            using (var db = new UnitOfWork())
            {
                long LastPageNo = 0;
                var DiaryList = await GetByUserId(Diary.CreatedBy);
                if (DiaryList.Count() > 0)
                    LastPageNo = DiaryList.Select(a => a.PageNo).Max();
                if (Diary.Title == null || Diary.Title == "")
                {
                    Diary.Title = "Page " + (LastPageNo + 1);
                }
                FilterDefinition<Diary> Filtrer = Builders<Diary>.Filter.Eq(a => a.Id, Diary.Id);
                return await db.Diary.Update(Diary,Filtrer);
            }
        }
    }
}
