using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.Api.ApiModels.Request
{
    public class DiaryRequestModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
