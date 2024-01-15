using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewModel> CreateAsync(ReviewModel model);
        Task<IEnumerable<ReviewModel>> GetReviewsByProductAsync(int productId);
    }
}
