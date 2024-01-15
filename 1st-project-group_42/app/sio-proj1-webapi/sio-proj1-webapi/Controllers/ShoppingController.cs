using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingService shoppingService;

        public ShoppingController(IShoppingService shoppingService)
        {
            this.shoppingService = shoppingService;
        }

        [HttpPost("order")]
        public async Task<IActionResult> CreateOrderAsync([FromBody] OrderModel order)
        {
            if (order == null)
            {
                return BadRequest();
            }

            var result = await shoppingService.CreateAsync(order);
            return Ok(result);
        }

        [HttpDelete("order/{id}")]
        public async Task<IActionResult> DeleteOrderAsync(int id)
        {
            var result = await shoppingService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpGet("order/{id}")]
        public async Task<IActionResult> GetOrderAsync(int id)
        {
            var result = await shoppingService.GetAsync(id);
            return Ok(result);
        }

        [HttpPut("order/{id}")]
        public async Task<IActionResult> UpdateOrderAsync(int id, [FromBody] OrderModel order)
        {
            var result = await shoppingService.UpdateAsync(id, order);
            return Ok(result);
        }
    }
}
