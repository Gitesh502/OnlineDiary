using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.Interfaces.Interfaces
{
    public interface IUserRepository
    {
         Task<bool> Insert(Users User);
         Task<Users> Find(FilterDefinition<Users> Filter);
    }
}
