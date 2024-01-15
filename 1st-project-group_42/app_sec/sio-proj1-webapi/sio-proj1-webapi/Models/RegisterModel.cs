using sio_proj1_webapi.Enums;

namespace sio_proj1_webapi.Models
{
    public sealed record RegisterModel(string Username, string Email, string Password, int ProfileId = (int)UserRole.customer);
}
