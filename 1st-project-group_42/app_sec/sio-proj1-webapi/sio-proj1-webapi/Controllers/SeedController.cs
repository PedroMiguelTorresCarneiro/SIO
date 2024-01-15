using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ISeedService seedService;
        public SeedController(ISeedService seedService)
        {
            this.seedService = seedService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SeedModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await seedService.SeedAsync(model);
            return Ok(result);
        }
    }
}
