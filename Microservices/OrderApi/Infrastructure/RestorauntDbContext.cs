using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure
{
    public class RestorauntDbContext : DbContext
    {
        public RestorauntDbContext(DbContextOptions options): base(options) { 
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RestorauntDbContext).Assembly);
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
