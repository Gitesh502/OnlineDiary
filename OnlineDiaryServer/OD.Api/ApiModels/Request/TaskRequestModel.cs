using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OD.Api.ApiModels.Request
{
    public class TaskRequestModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> Tags { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<string> AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsCompleted { get; set; }
        public string Status { get; set; }
        public string UpdatedBy { get; set; }
    }
}
