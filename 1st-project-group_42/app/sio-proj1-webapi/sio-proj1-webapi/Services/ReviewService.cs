using Microsoft.EntityFrameworkCore;
using sio_proj1_webapi.Domain;
using sio_proj1_webapi.Models;
using sio_proj1_webapi.Services.Interfaces;

namespace sio_proj1_webapi.Services
{
    public class ReviewService : IReviewService
    {
        private readonly sioproj1Context _context;
        public ReviewService(sioproj1Context context)
        {
            _context = context;
        }

        public async Task<ReviewModel> CreateAsync(ReviewModel model)
        {
            await _context.Reviews.AddAsync(new Review
            {
                ProductId = model.productId,
                Rating = model.rating,
                ReviewText = model.review,
                UserId = model.userId,
            });
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<IEnumerable<ReviewModel>> GetReviewsByProductAsync(int productId)
        {
            return await _context.Reviews
                .Where(x => x.ProductId == productId)
                .Select(x => new ReviewModel(x.ProductId.Value, x.UserId.Value, x.Rating, x.ReviewText))
                .ToListAsync();
        }
    }
}
