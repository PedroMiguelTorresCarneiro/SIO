using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Services
{
    public class CartService : ICartService
    {
        private readonly sioproj1Context _context;
        public CartService(sioproj1Context context)
        {
            _context = context;
        }
        public async Task<CartItemModel> CreateAsync(CartItemModel item)
        {
            await _context.Cartitems.AddAsync(new Cartitem
            {
                ProductId = item.productid,
                Quantity = item.quantity,
                UserId = item.userid,
            });
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<int> DeleteAsync(int cartItemId)
        {
            var current = await _context.Cartitems.FindAsync(cartItemId);
            if (current == null)
            {
                throw new Exception($"item not found for key {cartItemId}");
            }
            _context.Cartitems.Remove(current);
            var result = await _context.SaveChangesAsync();

            return result;
        }

        public async Task<IEnumerable<CartItemModel>> GetCartItemsByUserAsync(int userId)
        {
            return await _context.Cartitems
                .Where(x => x.UserId == userId)
                .Select(x => new CartItemModel(x.CartItemId, x.ProductId.Value, x.Product.Name, x.User.Username, x.UserId.Value, x.Quantity))
                .ToListAsync();
        }

        public async Task<CartItemModel> UpdateAsync(CartItemModel item)
        {
            var current = await _context.Cartitems.FindAsync(item.cartitemId);
            if(current == null)
            {
                throw new Exception($"item not found for key {item.cartitemId}");
            }

            current.Quantity = item.quantity;
            current.ProductId = item.productid;
            await _context.SaveChangesAsync();

            return item;
        }
    }
}
