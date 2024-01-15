using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService reviewService;

        public ReviewController(IReviewService reviewService)
        {
            this.reviewService = reviewService;
        }

        [HttpPost]
        public async Task<IActionResult> ReviewPostAsync([FromBody] ReviewModel model)
        {
            var result = await reviewService.CreateAsync(model);
            return Ok(result);
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetReviewByProductAsync(int productId)
        {
            var result = await reviewService.GetReviewsByProductAsync(productId);
            return Ok(result);
        }
    }
}
