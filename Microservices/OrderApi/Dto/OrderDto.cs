using Backend.Models;
using System;
using System.Collections.Generic;

namespace OrderApi.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public String CustomerUsername { get; set; }
        public String DelivererUsername { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
        public String Comment { get; set; }
        public String Address { get; set; }
        public double Price { get; set; }
        public long UTCTimeOrdered { get; set; }
        public long UTCTimeDeliveryStarted { get; set; }
        public int DeliveredTimeExpected { get; set; }
    }
}
