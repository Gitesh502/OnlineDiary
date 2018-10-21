using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public interface IDiaryService
    {
        Task<bool> AddDiary(Diary Diary);
    }
}
