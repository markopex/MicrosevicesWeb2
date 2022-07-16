import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/Shared/event.service';
import { Order } from '../shared/order.model';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input('filter') set setFilter(filter: string){
    this.filter = filter;
    console.log(this.filter);
    this.loadData();
  }
  filter: string;

  loadData(){
    if(this.filter != 'waiting-orders'){
      this.orderService.getOrders().subscribe(
        data => {
          console.log(data);
          if(this.filter == 'history'){
            this.orders = data.filter(i => i.utcTimeDeliveryExpected != 0 && i.utcTimeDeliveryExpected <= new Date().getTime());
          }
          if(this.filter == 'active'){
            this.orders = data.filter(i => (i.utcTimeDeliveryExpected != 0 && i.utcTimeDeliveryExpected > new Date().getTime()) || (i.utcTimeDeliveryExpected == 0));
          }
          this.orders.forEach(element => {
            let sum = 0;
            element.orderDetails.forEach( orderItem => {
              sum += orderItem.price;
            });
            element.price = sum;
          });
        }
      )
    }else{
      this.orderService.getPendingOrders().subscribe(
        data => {
          console.log(data);
          this.orders = data;
        }
      )
    }
  }

  orders: Order[] = [];
  constructor(private orderService: OrdersService, private eventService: EventService) {
   }

  ngOnInit(): void {
    this.eventService.eventObservable.subscribe(
      data => {
        this.loadData();
      }
    )
  }

}
