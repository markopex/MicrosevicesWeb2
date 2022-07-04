import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/shared/product.model';
import { ProductService } from 'src/app/products/shared/product.service';

@Component({
  selector: 'app-basket-item-product',
  templateUrl: './basket-item-product.component.html',
  styleUrls: ['./basket-item-product.component.scss']
})
export class BasketItemProductComponent implements OnInit {

  product: Product
  @Input() set productId(value: number){
    this.productService.getProduct(value).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  constructor(private productService: ProductService) {

   }

  ngOnInit(): void {
  }

}
