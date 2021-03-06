﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace OD.Entities
{
    public partial class Users : IEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string Id { get; set; }
        public string FullName { get; set; }
        [BsonElement("Email")]
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public bool? RememberMe { get; set; } = false;
        public DateTime? RegisteredDate { get; set; } = DateTime.Now;
        public bool? IsActive{get;set;}=true;
    }
}
