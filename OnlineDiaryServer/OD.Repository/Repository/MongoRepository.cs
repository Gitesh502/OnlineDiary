using MongoDB.Bson;
using MongoDB.Driver;
using OD.Entities;
using OD.Interfaces;
using OD.Repository.Context;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OD.Repository
{
    public  class MongoRepository<TEntity>
        : DbContext,IRepository<TEntity, string> where TEntity : IEntity
    {

        protected  IMongoCollection<TEntity> Collection { get; }
        public MongoRepository()
        {
            this.Collection = MongoDatabase.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public virtual async Task<List<TEntity>> GetAsync(FilterDefinition<TEntity> Filter)
        {
            return await Collection.Find(Filter).ToListAsync();
        }

        public virtual async Task<TEntity> GetOneAsync(FilterDefinition<TEntity> Filter)
        {
            return await Collection.Find(Filter).FirstOrDefaultAsync();
        }
        
        public virtual async Task<TEntity> SaveAsync(TEntity entity)
        {
            await Collection.InsertOneAsync(entity);
            return entity;
        }

        public virtual async Task<TEntity> UpdateAsync(FilterDefinition<TEntity> Filter,
            TEntity entity)
        {
            return await Collection.FindOneAndReplaceAsync(Filter, entity);
        }

        //public virtual async Task<TEntity> ReplaceAsync(TEntity entity)
        //{
        //    if (string.IsNullOrWhiteSpace(entity.Id))
        //    {
        //        entity.Id = ObjectId.GenerateNewId().ToString();
        //    }

        //    await Collection.ReplaceOneAsync(
        //        x => x.Id.Equals(entity.Id),
        //        entity,
        //        new UpdateOptions
        //        {
        //            IsUpsert = true
        //        });

        //    return entity;
        //}

        //public virtual async Task DeleteAsync(string id)
        //{
        //    await Collection.DeleteOneAsync(x => x.Id.Equals(id));
        //}

        //public virtual async Task<ICollection<TEntity>> FindAllAsync(
        //    Expression<Func<TEntity, bool>> predicate)
        //{
        //    return await Collection.Find(predicate).ToListAsync();
        //}
    }
}
