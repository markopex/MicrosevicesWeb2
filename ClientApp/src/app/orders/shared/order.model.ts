import { OrderItem } from "./order-item.model";

export class Order {
    id: number;
    customerUsername: string;
    deliverer: string;
    orderDetails: OrderItem[];
    comment: string;
    address: string;
    price: number;
    uTCTimeOrdered: number;
    uTCTimeDeliveryStarted: number;
    utcTimeDeliveryExpected: number;
}