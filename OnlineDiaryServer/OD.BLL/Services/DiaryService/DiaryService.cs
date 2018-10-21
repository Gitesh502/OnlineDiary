using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public class DiaryService: IDiaryService
    {
        public async Task<bool> AddDiary(Diary Diary)
        {
            using (var db = new UnitOfWork())
            {
                var result = await db.Diary.Add(Diary);
                return result;
            }
        }
    }
}
