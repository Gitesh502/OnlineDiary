using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace OD.Entities
{
    public partial class Log : IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Type { get; set; }
        public string RefreshToken { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string LocalIp { get; set; }
        public string RemoteIp { get; set; }
        public string OS { get; set; }
        public string OS_Version { get; set; }
        public string Device { get; set; }
        public string Device_Version { get; set; }
        public string Browser { get; set; }
        public string Browser_Version { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LogDate { get; set; } = DateTime.Now;
    }
}
