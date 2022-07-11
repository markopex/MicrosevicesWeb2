import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from '../shared/order-item.model';

@Component({
  selector: 'app-order-detail-product',
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.scss']
})
export class OrderDetailProductComponent implements OnInit {

  @Input()
  orderItem: OrderItem

  constructor() { }

  ngOnInit(): void {
  }

}
