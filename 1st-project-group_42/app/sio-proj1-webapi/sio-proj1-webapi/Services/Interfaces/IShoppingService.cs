using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface IShoppingService
    {
        Task<OrderModel> CreateAsync(OrderModel model);
        Task<OrderModel> UpdateAsync(int id, OrderModel model);
        Task<OrderModel> GetAsync(int id);
        Task<int> DeleteAsync(int id);
    }
}
