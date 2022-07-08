using System;
using System.Collections.Generic;
using System.Linq;

namespace OrderApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public string Deliverer { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }
        public String Comment { get; set; }
        public String Address { get; set; }
        public double Price => OrderDetails.Sum(i => i.Price);
        public long UTCTimeOrderCreated { get; set; }
        public long UTCTimeDeliveryStarted { get; set; }
        public long UTCTimeDeliveryExpected { get; set; }
        public DateTime TimeOrdered { get { return new DateTime(UTCTimeOrderCreated); } }
        public DateTime TimeDeliveryStarted { get { return new DateTime(UTCTimeDeliveryStarted); } }
        public DateTime TimeDeliveryExpected { get { return new DateTime(UTCTimeDeliveryStarted + UTCTimeDeliveryExpected); } }

    }
}
