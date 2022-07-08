using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Infrastructure.Configurations
{
    public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
    {
        public void Configure(EntityTypeBuilder<OrderDetail> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(s => s.Quantity).IsRequired();
            builder.Property(s => s.ProductPrice).IsRequired();
            builder.HasOne(s => s.Order)
                   .WithMany(ad => ad.OrderDetails)
                   .HasPrincipalKey(ad => ad.Id);

            builder.HasOne(x => x.Product) //Kazemo da Student ima jedan fakultet
                   .WithMany(x => x.OrderDetails) // A jedan fakultet vise studenata
                   .HasForeignKey(x => x.ProductId) // Strani kljuc  je facultyId
                   .OnDelete(DeleteBehavior.NoAction);// Ako se obrise fakultet kaskadno se brisu svi njegovi studenti
        }
    }
}
