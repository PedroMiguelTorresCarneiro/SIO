using sio_proj1_webapi.Enums;

namespace sio_proj1_webapi.Models
{
    public sealed record UserModel(int Id, string Username, string Email, int ProfileId = (int)UserRole.customer);
}
