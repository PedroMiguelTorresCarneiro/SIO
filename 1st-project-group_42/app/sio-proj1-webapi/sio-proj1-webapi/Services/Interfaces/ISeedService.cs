using sio_proj1_webapi.Models;

namespace sio_proj1_webapi.Services.Interfaces
{
    public interface ISeedService
    {
        Task<int> SeedAsync(SeedModel model);
    }
}
