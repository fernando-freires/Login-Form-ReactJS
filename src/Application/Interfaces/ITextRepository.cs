using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITextRepository
    {
        Task AddTextAsync(TextEntity text);
        Task<IEnumerable<TextEntity>> GetAllTextsAsync();
    }
}
