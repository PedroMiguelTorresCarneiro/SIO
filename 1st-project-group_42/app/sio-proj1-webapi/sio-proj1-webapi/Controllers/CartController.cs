using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService cartService;

        public CartController(ICartService cartService)
        {
            this.cartService = cartService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CartItemModel model)
        {
            CartItemModel result;
            try
            {
                result = await cartService.CreateAsync(model);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CartItemModel model)
        {
            if (id != model.cartitemId)
            {
                return BadRequest();
            }
            CartItemModel result;
            try
            {
                result = await cartService.UpdateAsync(model);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            return Ok(result);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            var result = await cartService.GetCartItemsByUserAsync(userId);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = 0;
            try
            {
                result = await cartService.DeleteAsync(id);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            return Ok(result);
        }
    }
}
