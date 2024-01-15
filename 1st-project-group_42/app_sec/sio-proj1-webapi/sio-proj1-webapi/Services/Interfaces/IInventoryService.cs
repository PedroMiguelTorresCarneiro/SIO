using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface IInventoryService
    {
        Task<ProductModel> CreateProductAsync(ProductModel product);

        Task<IEnumerable<ProductModel>> GetProductsAsync(FilterModel filter);

        Task<List<ProductModel>> GetProductAsync(string productId);

        Task<CategoryModel> CreateCategoryAsync(CategoryModel category);

        Task<ProductModel> UpdateProductAsync(ProductModel product);

        Task<IEnumerable<CategoryModel>> GetCategoriesAsync();
    }
}
