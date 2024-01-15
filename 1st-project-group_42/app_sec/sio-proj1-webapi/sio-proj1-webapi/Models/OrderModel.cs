namespace sio_proj1_webapi.Models
{
    public sealed record OrderModel(int userid, Enums.OrderStatus status, OrderItemModel[] items = null) 
    {
        public OrderItemModel[] items { get; init; } = items ?? Array.Empty<OrderItemModel>();
    }
}
