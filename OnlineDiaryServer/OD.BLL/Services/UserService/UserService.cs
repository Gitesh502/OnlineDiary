using MongoDB.Driver;
using OD.BLL.Helpers;
using OD.Entities;
using System.Threading.Tasks;

namespace OD.BLL.Services
{
    public class UserService : IUserService
    {
        public async Task<bool> CreateUser(Users User)
        {
            using (var db = new UnitOfWork())
            {
                var result = await db.Users.Insert(User);
                return result;
            }
        }

        public async Task<Users> Authenticate(string Email, string Password)
        {

            using (UnitOfWork db = new UnitOfWork())
            {
                FilterDefinition<Users> filter =
                    Builders<Users>.Filter.Eq("Email", Email);
                var result = await db.Users.Find(filter);
                if (result != null)
                {
                    string Salt = result.Salt;
                    string ModifiedSalt = Password + Salt;
                    string HashPassword = SecureUtility.GetHash(ModifiedSalt);
                    if (HashPassword.Equals(result.PasswordHash))
                    {

                        return result;
                    }
                }
            }
            return null;

        }

        public Users GetById(string Id)
        {
            using (UnitOfWork db = new UnitOfWork())
            {
                FilterDefinition<Users> filter =
                    Builders<Users>.Filter.Eq("_id", Id);
                var result =  db.Users.Find(filter).Result;
                if (result != null)
                {
                    return result;
                }
            }
            return null;
        }
    }
}
