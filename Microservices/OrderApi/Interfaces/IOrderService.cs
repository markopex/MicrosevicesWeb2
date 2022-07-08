using OrderApi.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderApi.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> AddOrder(string customerEmail, CreateOrderDto orderDto, string token);
        List<OrderDto> GetOrders();
        List<OrderDto> GetPendingOrders();
        List<OrderDto> GetOrdersByUser(string userEmail);
        OrderDto GetOrder(int id);
        OrderDto DeliverOrder(int id, string userEmail);
    }
}
