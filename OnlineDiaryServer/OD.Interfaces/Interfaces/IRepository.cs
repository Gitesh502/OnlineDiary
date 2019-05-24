using MongoDB.Driver;
using OD.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OD.Interfaces
{
    public interface IRepository<TEntity, in TKey> where TEntity : IEntity<TKey>
    {
        Task<List<TEntity>> GetAsync(FilterDefinition<TEntity> Filter);

        Task<TEntity> GetOneAsync(FilterDefinition<TEntity> Filter);

        Task<TEntity> SaveAsync(TEntity entity);

        Task<TEntity> UpdateAsync(FilterDefinition<TEntity> Filter, TEntity entity);

        Task<UpdateResult> UpdateManyAsync(FilterDefinition<TEntity> Filter,UpdateDefinition<TEntity> entity);

    }
}
