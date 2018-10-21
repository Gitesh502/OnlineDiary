using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace OD.Repository.Context
{
    public class DbContext
    {
        public DbContext()
           : this("MongoDb")
        {
        }

        public DbContext(string connectionName)
        {
            var url = "mongodb://onlinediary:amzur123@ds117773.mlab.com:17773/onlinediary";
            var mongoUrl = new MongoUrl(url);
            IMongoClient client = new MongoClient(mongoUrl);
            MongoDatabase = client.GetDatabase(mongoUrl.DatabaseName);
        }

        public IMongoDatabase MongoDatabase { get; }
    }
}
