namespace sio_proj1_webapi.Models
{
    public sealed record FilterModel(string[] filters = null)
    {
        public string[] filters { get; init; } = filters ?? Array.Empty<string>();
    }
}
