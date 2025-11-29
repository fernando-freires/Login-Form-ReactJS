using Application.Interfaces;
using Domain.Entities;
using Infra.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infra.Data
{
    public class TextRepository : ITextRepository
    {
        private readonly AppDbContext _context;

        public TextRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddTextAsync(TextEntity text)
        {
            _context.TextEntities.Add(text);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TextEntity>> GetAllTextsAsync()
        {
            return await _context.TextEntities.ToListAsync();
        }
    }
}
