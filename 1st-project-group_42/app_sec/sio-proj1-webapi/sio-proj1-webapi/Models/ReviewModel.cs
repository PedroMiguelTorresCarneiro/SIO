namespace sio_proj1_webapi.Models
{
    public sealed record ReviewModel(int productId, int userId, int rating, string review);
}
