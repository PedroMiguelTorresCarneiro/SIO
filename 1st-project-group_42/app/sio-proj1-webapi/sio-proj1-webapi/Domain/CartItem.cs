using System;
using System.Collections.Generic;

namespace sio_proj1_webapi.Domain
{
    public partial class Cartitem
    {
        public int CartItemId { get; set; }
        public int? UserId { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }

        public virtual Product? Product { get; set; }
        public virtual User? User { get; set; }
    }
}
