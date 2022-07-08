namespace OrderApi.Dto
{
    public class CreateOrderDetailDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public uint Quantity { get; set; }
    }
}
