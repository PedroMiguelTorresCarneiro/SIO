using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;
using EFCore.BulkExtensions;

namespace sio_proj1_webapi.Services
{
    public class Cwe89InventoryService : IInventoryService
    {
        private readonly sioproj1Context _context;
        public Cwe89InventoryService(sioproj1Context context) 
        {
            _context = context;
        }

        public async Task<CategoryModel> CreateCategoryAsync(CategoryModel category)
        {
            await _context.Categories.AddAsync(new Category
            {
                CategoryName = category.name
            });
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<ProductModel> CreateProductAsync(ProductModel product)
        {
            await _context.Products.AddAsync(new Product
            {
                CategoryId = product.categoryId,
                Name = product.name,
                Description = product.description,
                Price = product.price,
                ProductImage = product.image,
                StockQuantity = product.stock

            });
            
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<IEnumerable<CategoryModel>> GetCategoriesAsync()
        {
            return await _context.Categories.Select(x => new CategoryModel(x.CategoryName)).ToListAsync();
        }

        public Task<List<ProductModel>> GetProductAsync(string productId)
        {
            var result = _context.Products.FromSqlRaw("select * from public.products where product_id = " + productId);

            if (result == null)
            {
                throw new Exception($"No product found for key {productId}");
            }

            return Task.FromResult(result.Select(x => new ProductModel(x.ProductId, x.Name, x.Description, x.Price, x.CategoryId.GetValueOrDefault(), x.StockQuantity, Array.Empty<byte>())).ToList());
        }

        public async Task<IEnumerable<ProductModel>> GetProductsAsync(FilterModel model)
        {
            var rawQuery = "SELECT * FROM public.products";

            if (model.filters != null && model.filters.Any())
            {
                rawQuery = rawQuery + " WHERE " + string.Join(" AND ", model.filters);
            }

            var query = _context.Products.FromSqlRaw(rawQuery);
            return query
                .Select(x => new ProductModel(x.ProductId, x.Name, x.Description, x.Price, x.CategoryId.Value, x.StockQuantity, x.ProductImage))
                .ToList();
        }

        public async Task<ProductModel> UpdateProductAsync(ProductModel product)
        {
            var result = await _context.Products.FindAsync(product.id);

            if (result == null)
            {
                throw new Exception($"No product found for key {product.id}");
            }

            result.StockQuantity = product.stock;
            await _context.SaveChangesAsync();

            return product;

        }
    }
}
