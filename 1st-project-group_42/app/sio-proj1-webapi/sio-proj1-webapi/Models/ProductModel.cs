namespace sio_proj1_webapi.Models
{
    public sealed record ProductModel(int id, string name, string description, decimal price, int categoryId, int stock, byte[] image = null)
    {
        public byte[] image { get; init; } = image ?? Array.Empty<byte>(); 
    }
}
