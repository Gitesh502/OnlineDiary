using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.Api.ApiModels.Request
{
    public class TokenRequestModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
