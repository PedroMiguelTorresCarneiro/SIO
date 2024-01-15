using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Enums;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Services
{
    public class SeedService : ISeedService
    {
        private readonly IUserService _userService;
        private readonly IShoppingService _shoppingService;
        private readonly IInventoryService _inventoryService;
        private readonly IReviewService _reviewService;
        private readonly ICartService _cartService;
        private readonly sioproj1Context _dbContext;
        public SeedService(IUserService userService, IShoppingService shoppingService, IInventoryService inventoryService, IReviewService reviewService, ICartService cartService, sioproj1Context dbContext)
        {
            _userService = userService;
            _shoppingService = shoppingService;
            _inventoryService = inventoryService;
            _reviewService = reviewService;
            _cartService = cartService;
            _dbContext = dbContext;

        }
        public async Task<int> SeedAsync(SeedModel model)
        {
            if (model.createDb)
            {
                await _dbContext.Database.EnsureCreatedAsync();
            }
            
            var users = new List<RegisterModel>
            {
                new RegisterModel("admin", "admin@email", "AdminPass!1.", (int)UserRole.admin),
                new RegisterModel("user", "user@email", "UserPass!1."),
            };
            var categories = new List<CategoryModel>
            {
                new CategoryModel("Category#1"),
                new CategoryModel("Category#2"),
                new CategoryModel("Category#3"),
            };
            var products = new List<ProductModel>
            {
                new ProductModel(0, "product#1", "cool product", 10, 2, 5, Array.Empty<byte>()),
                new ProductModel(0, "product#2", "not so cool product", 2, 3, 50, Array.Empty<byte>()),
                new ProductModel(0, "product#3", "mid product", 1, 1, 2, Array.Empty<byte>()),
            };
            var reviews = new List<ReviewModel>
            {
                new ReviewModel(1, 2, 5, "very cool"),
                new ReviewModel(1, 2, 5, "very cool"),
                new ReviewModel(1, 2, 5, "very cool"),
                new ReviewModel(1, 2, 5, "very cool"),
            };

            foreach (var item in users)
            {
                await _userService.Register(item);
            }

            foreach (var item in categories)
            {
                await _inventoryService.CreateCategoryAsync(item);
            }

            foreach(var item in products)
            {
                await _inventoryService.CreateProductAsync(item);
            }

            foreach (var item in reviews)
            {
                await _reviewService.CreateAsync(item);
            }

            return 1;
        }
    }
}
