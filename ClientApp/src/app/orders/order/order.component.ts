import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown';
import { MessageService } from 'primeng/api';
import { Order } from '../shared/order.model';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  @Input() set ord(order: Order){
    this.order = order;
    let currentTime = new Date().getTime();
    console.log('taka');
    console.log(currentTime);
    console.log(this.order.utcTimeDeliveryExpected);
    if(this.order.utcTimeDeliveryExpected > currentTime){
      this.secondsUntil = (this.order.utcTimeDeliveryExpected - currentTime)/1000;
      this.countdown.begin();
    }
  }
  order: Order;

  isTaking = false;
  secondsUntil = 0;

  constructor(private ordersService: OrdersService, private messageService: MessageService, private router: Router) {
    
   }

  ngOnInit(): void {
  }

  deliverOrder(){
    this.isTaking = true;
    this.ordersService.takeDelivery(this.order.id).subscribe(
      data => {
        this.isTaking = false;
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Order taken successfully.'});
        location.reload();
        this.router.navigateByUrl('/orders');
      },
      error => {
        console.log(error);
        this.isTaking = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to take this order.'});
      }
    )
  }

}
