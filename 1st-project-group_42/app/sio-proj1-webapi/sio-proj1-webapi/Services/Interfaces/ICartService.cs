using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemModel>> GetCartItemsByUserAsync(int userId);

        Task<CartItemModel> CreateAsync(CartItemModel item);

        Task<CartItemModel> UpdateAsync(CartItemModel item);
        Task<int> DeleteAsync(int cartItemId);
    }
}
