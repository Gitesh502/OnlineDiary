using System;
using System.Collections.Generic;
using System.Text;

namespace OD.Entities
{
    public interface IEntity<TKey>
    {
        TKey Id { get; set; }
    }

    public interface IEntity : IEntity<string>
    {
    }
}
