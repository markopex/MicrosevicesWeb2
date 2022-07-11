import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderComponent } from './orders/order/order.component';
import {CardModule} from 'primeng/card';
import { OrderDetailProductComponent } from './orders/order-detail-product/order-detail-product.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { DeliverersListComponent } from './user/deliverers/deliverers-list/deliverers-list.component';
import { DelivererComponent } from './user/deliverers/deliverer/deliverer.component';
import {OrderListModule} from 'primeng/orderlist';
import { LoginComponent } from './user/login/login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import {CalendarModule} from 'primeng/calendar';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductComponent } from './products/product/product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { BasketItemsComponent } from './basket/basket-items/basket-items.component';
import { BasketItemProductComponent } from './basket/basket-item-product/basket-item-product.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { BasketComponent } from './basket/basket/basket.component';
import { BasketCheckoutComponent } from './basket/basket-checkout/basket-checkout.component';
import {FileUploadModule} from 'primeng/fileupload';
import { OrdersComponent } from './orders/orders/orders.component';
import {TabViewModule} from 'primeng/tabview';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';

export function roleGetter(){
  return localStorage.getItem('role');
}

function countdownConfigFactory(): CountdownConfig {
  return { format: `mm:ss` };
}


@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    OrderComponent,
    OrderDetailProductComponent,
    SidebarComponent,
    DeliverersListComponent,
    DelivererComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductComponent,
    ProductListComponent,
    AddProductComponent,
    BasketItemsComponent,
    BasketItemProductComponent,
    BasketComponent,
    BasketCheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    ToastModule,
    InputNumberModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    CardModule,
    OrderListModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
    TabViewModule,
    CountdownModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      },
      { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
