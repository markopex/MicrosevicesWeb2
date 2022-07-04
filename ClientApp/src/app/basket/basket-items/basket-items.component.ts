import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/products/shared/product.service';
import { Basket } from '../shared/basket.model';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-basket-items',
  templateUrl: './basket-items.component.html',
  styleUrls: ['./basket-items.component.scss'],
  providers: [MessageService]
})
export class BasketItemsComponent implements OnInit {

  basket: Basket;

  constructor(private basketService: BasketService, private messageService: MessageService, private router: Router, private productService: ProductService) {
    this.basketService.getBasket().subscribe(
      data => {
        data.basketItems.forEach(item => {
          this.productService.getProduct(item.productId).subscribe(
            product => {
              item.product = product;
            }
          );
        });
        this.basket = data;
        console.log(data);
      }
    )
   }

  ngOnInit(): void {
  }

}
