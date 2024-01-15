using System;
using System.Collections.Generic;

namespace sio_proj1_webapi.Domain
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int? UserId { get; set; }
        public int? ProductId { get; set; }
        public int Rating { get; set; }
        public string? ReviewText { get; set; }

        public virtual Product? Product { get; set; }
        public virtual User? User { get; set; }
    }
}
