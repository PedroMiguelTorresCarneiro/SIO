using System;
using System.Collections.Generic;

namespace sio_proj1_webapi.Domain
{
    public partial class Product
    {
        public Product()
        {
            Cartitems = new HashSet<Cartitem>();
            Orderitems = new HashSet<Orderitem>();
            Reviews = new HashSet<Review>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public byte[] ProductImage { get; set; }
        public int? CategoryId { get; set; }
        public int StockQuantity { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<Cartitem> Cartitems { get; set; }
        public virtual ICollection<Orderitem> Orderitems { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
