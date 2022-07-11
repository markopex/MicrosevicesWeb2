import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketItemsComponent } from './basket/basket-items/basket-items.component';
import { BasketComponent } from './basket/basket/basket.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { DeliverersListComponent } from './user/deliverers/deliverers-list/deliverers-list.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path:'home',component: ProductListComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'deliverers',component: DeliverersListComponent},
  {path:'card',component: BasketComponent},
  {path:'orders',component: OrdersComponent},
  {path:'profile',component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
