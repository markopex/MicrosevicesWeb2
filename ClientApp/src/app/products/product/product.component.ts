import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { roleGetter } from 'src/app/app.module';
import { BasketItem } from 'src/app/basket/shared/basket-item.model';
import { BasketService } from 'src/app/basket/shared/basket.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService]
})
export class ProductComponent implements OnInit {

  @Input()
  product?: Product;

  displayModal: boolean = false;

  role = roleGetter();

  constructor(private basketService: BasketService, private messageService: MessageService) {
    
   }

  ngOnInit(): void {
  }

  addToBasket(){
    let item = new BasketItem();
    item.productId = this.product.id;
    item.quantity = 1;
    this.basketService.addToBasket(item).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Product added to basket:)'});
      },
      error=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to add product to basket:/'});
      }
    )
  }

}
