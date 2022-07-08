import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input()
  order: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
