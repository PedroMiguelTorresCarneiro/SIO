using System;
using System.Collections.Generic;

namespace sio_proj1_webapi.Domain
{
    public partial class User
    {
        public User()
        {
            Cartitems = new HashSet<Cartitem>();
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string PasswordSalt { get; set; } = null!;

        public Enums.UserRole UserRole { get; set; }

        public virtual ICollection<Cartitem> Cartitems { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
