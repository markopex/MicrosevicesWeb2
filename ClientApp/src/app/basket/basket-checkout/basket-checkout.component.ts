import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-basket-checkout',
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.scss'],
  providers: [MessageService]
})
export class BasketCheckoutComponent implements OnInit {

  @Input()
  total: number = 0;

  isSending = false;

  checkoutForm = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(70)]),
    comment: new FormControl('', [ Validators.minLength(1), Validators.maxLength(100)]),
  });

  constructor(private basketService: BasketService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  checkout(){
    this.basketService.checkout(this.checkoutForm.value).subscribe(
      data => {
        // erace previous basket

      },
      error =>{
        // show error
        
      }
    )
  }

}
