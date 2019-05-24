using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.Api.ApiModels.Request
{
    public class UserRequestModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public bool RememberMe { get; set; }
    }
}
