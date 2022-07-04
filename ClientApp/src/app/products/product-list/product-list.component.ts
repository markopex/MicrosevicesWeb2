import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [MessageService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  role = this.authService.roleStateObservable.value;

  displayModal: boolean;
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    ingredients: new FormControl('', [ Validators.minLength(1), Validators.maxLength(500)]),
    price: new FormControl('0.0', [Validators.required, Validators.minLength(1), Validators.maxLength(30)])
  });
  isAdding = false;
  constructor(private productService: ProductService, private messageService: MessageService, private authService: AuthService) {
    this.loadProducts();
   }

  ngOnInit(): void {
    this.authService.roleStateObservable.subscribe(
      data => {
        this.role = data;
      }
    )
  }

  loadProducts(){
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {

      }
    )
  }

  showModalDialog() {
    this.displayModal = true;
  }

  addProduct(){
    if(this.addForm.valid){
      this.isAdding = true;
      this.productService.addProduct(this.addForm.value).subscribe(
        data => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Meal added successfully'});
          this.displayModal = false;
          this.loadProducts();
          this.isAdding = false;
        },
        error =>{
          this.isAdding = false;
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to add meal to menu'});
        }
      )
    }
  }

}
