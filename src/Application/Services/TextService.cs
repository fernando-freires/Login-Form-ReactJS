using Application.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TextService
    {
        private readonly ITextRepository _textRepository;

        public TextService(ITextRepository textRepository)
        {
            _textRepository = textRepository;
        }

        public async Task AddTextAsync(string content)
        {
            var text = new TextEntity { Content = content };
            await _textRepository.AddTextAsync(text);
        }

        public async Task<IEnumerable<string>> GetAllTextsAsync()
        {
            var texts = await _textRepository.GetAllTextsAsync();
            return texts.Select(t => t.Content);
        }
    }
}
