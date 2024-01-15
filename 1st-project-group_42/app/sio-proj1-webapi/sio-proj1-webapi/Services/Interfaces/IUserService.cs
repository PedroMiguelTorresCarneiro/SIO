using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserModel> Register(RegisterModel resource, CancellationToken cancellationToken = default);
        Task<UserModel> Login(LoginModel resource, CancellationToken cancellationToken = default);
        Task<UserModel> ResetPassword(int userId, string newPassword);

        Task<UserModel> GetUserByUsernameAsync(string username, CancellationToken cancellationToken = default);

        Task<UserModel> UpdateUserAsync(UserModel userModel, CancellationToken cancellationToken = default);
    }
}
