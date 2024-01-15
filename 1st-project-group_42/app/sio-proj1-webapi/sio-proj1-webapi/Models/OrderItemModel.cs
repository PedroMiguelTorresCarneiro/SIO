namespace sio_proj1_webapi.Models
{
    public sealed record OrderItemModel(int productId, int quantity, decimal subtotal);
}
