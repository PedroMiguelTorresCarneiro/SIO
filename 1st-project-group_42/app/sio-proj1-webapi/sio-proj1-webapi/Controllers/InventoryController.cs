using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            this.inventoryService = inventoryService;
        }

        [HttpPost("product")]
        public async Task<IActionResult> CreateProductAsync([FromBody]ProductModel product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            var result = await inventoryService.CreateProductAsync(product);

            return Ok(result);
        }

        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProductByIdAsync(string id)
        {
            List<ProductModel> result;
            try
            {
                result = await inventoryService.GetProductAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(result);
        }

        [HttpPut("product/{id}")]
        public async Task<IActionResult> UpdateProductAsync(int id, ProductModel product)
        {
            if (product.id != id)
            {
                return BadRequest();
            }
            ProductModel result;
            try
            {
                result = await inventoryService.UpdateProductAsync(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(result);
        }

        [HttpGet("product")]
        public async Task<IActionResult> GetProductsAsync([FromQuery]FilterModel filterModel)
        {
            IEnumerable<ProductModel> result;
            try
            {
                result = await inventoryService.GetProductsAsync(filterModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(result);
        }

        [HttpGet("category")]
        public async Task<IActionResult> GetCategoriesAsync()
        {
            IEnumerable<CategoryModel> result;
            try
            {
                result = await inventoryService.GetCategoriesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(result);
        }

        [HttpPost("category")]
        public async Task<IActionResult> CreateCategoryAsync([FromBody]CategoryModel Category)
        {
            if (Category == null)
            {
                return BadRequest();
            }

            var result = await inventoryService.CreateCategoryAsync(Category);

            return Ok(result);
        }
    }
}
