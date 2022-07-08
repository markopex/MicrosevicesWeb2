using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            
            builder.Property(s => s.Address)
                   .IsRequired();

            builder.Property(s => s.UTCTimeOrdered).IsRequired();
            //builder.Property(s => s.UTCTimeDeliveryStarted).IsRequired(false);
            //builder.Property(s => s.DeliveredTimeExpected).IsRequired(false);

            builder.HasOne<User>(s => s.Customer) // order must be connected only to one user
                   .WithMany(g => g.Orders) // user can have multiple orders
                   .OnDelete(DeleteBehavior.NoAction)
                   .HasForeignKey(s => s.CustomerUsername)   // foreigh key is user email
                   .IsRequired();   // order must have user     

            builder.HasOne<User>(s => s.Deliverer)
                   .WithMany(g => g.OrdersToDiliver)
                   .HasForeignKey(s => s.DelivererUsername)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany<OrderDetail>(s => s.OrderDetails)
                   .WithOne(g => g.Order)
                   .HasPrincipalKey(s => s.Id)
                   .IsRequired();
        }
    }
}
