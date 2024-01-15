using Microsoft.AspNetCore.Mvc;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;
using sio_proj1_webapi.Validators;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sio_proj1_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly IUserService userService;
        public SecurityController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            PasswordValidator _validator = new PasswordValidator();
            var validResult = _validator.Validate(model);
            if (!validResult.IsValid)
            {
                return BadRequest(validResult.Errors.Select(e => e.ErrorMessage));
            }
            var result = await userService.Register(model);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            UserModel result;
            try
            {
                result = await userService.Login(model);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            return Ok(result);
        }

        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetByUsernameAsync(string username)
        {
            var result = await userService.GetUserByUsernameAsync(username);
            return Ok(result);
        }

        [HttpPut("user/{id}")]
        public async Task<IActionResult> PutUserAsync(int id, UserModel userModel)
        {
            if(id != userModel.Id)
            {
                return BadRequest();
            }

            var result = await userService.UpdateUserAsync(userModel);
            return Ok(result);
        }

    }
}
