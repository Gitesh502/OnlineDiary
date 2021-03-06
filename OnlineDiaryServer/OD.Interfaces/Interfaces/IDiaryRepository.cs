﻿using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.Interfaces.Interfaces
{
    public interface IDiaryRepository
    {
        Task<bool> Add(Diary Diary);
        Task<List<Diary>> Find(FilterDefinition<Diary> Filter);
        Task<Diary> Update(Diary Diary, FilterDefinition<Diary> Filter);
    }
}
