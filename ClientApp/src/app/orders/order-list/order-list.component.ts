import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  constructor(private orderService: OrdersService) {
    this.orderService.getOrders().subscribe(
      data => {
        this.orders = data;
      }
    )
   }

  ngOnInit(): void {
  }

}
