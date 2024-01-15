namespace sio_proj1_webapi.Models
{
    public sealed record CartItemModel(int cartitemId, int productid, string product, string user, int userid, int quantity);
}
