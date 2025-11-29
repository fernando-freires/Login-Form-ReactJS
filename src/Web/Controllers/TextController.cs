using Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TextController : ControllerBase
    {
        private readonly TextService _textService;

        public TextController(TextService textService)
        {
            _textService = textService;
        }

        [HttpPost]
        public async Task<IActionResult> AddText([FromBody] TextRequest request)
        {
            await _textService.AddTextAsync(request.Text);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTexts()
        {
            var texts = await _textService.GetAllTextsAsync();
            return Ok(texts);
        }
    }
}
