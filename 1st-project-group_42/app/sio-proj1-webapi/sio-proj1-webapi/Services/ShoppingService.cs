using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Services
{
    public class ShoppingService : IShoppingService
    {
        private readonly sioproj1Context _context;
        public ShoppingService(sioproj1Context context)
        {
            _context = context;
        }

        public async Task<OrderModel> CreateAsync(OrderModel model)
        {
            await _context.Orders.AddAsync(new Order
            {
                OrderDate = DateTime.Now,
                Status = model.status,
                UserId = model.userid,
                Orderitems = model.items.Select(x => new Orderitem
                {
                    ProductId = x.productId,
                    Quantity = x.quantity,
                    Subtotal = x.subtotal
                }).ToList(),
            });
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<int> DeleteAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new Exception($"Not found order for key {id}");
            }

            _context.Orders.Remove(order);

            return await _context.SaveChangesAsync();
        }

        public async Task<OrderModel> GetAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new Exception($"Not found order for key {id}");
            }
            return new OrderModel(order.UserId.Value, order.Status, order.Orderitems.Select(x => new OrderItemModel(x.ProductId.Value, x.Quantity, x.Subtotal)).ToArray());
        }

        public async Task<OrderModel> UpdateAsync(int id, OrderModel model)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new Exception($"Not found order for key {id}");
            }

            order.Status = model.status;
            order.Orderitems = model.items.Select(x => new Orderitem
            {
                ProductId = x.productId,
                Quantity = x.quantity,
                Subtotal = x.subtotal
            }).ToList();

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return model;
        }
    }
}
