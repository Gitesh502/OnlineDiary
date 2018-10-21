using OD.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public interface IUserService
    {
        Task<bool> CreateUser(Users User);
        Task<Users> Authenticate(string Email, string Password);
        Users GetById(string Id);
    }
}
