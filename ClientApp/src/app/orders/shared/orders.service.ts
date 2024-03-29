import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.serverUrl + "/orders");
  }

  getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.serverUrl + "/orders/waiting");
  }

  takeDelivery(orderId: number): Observable<Object>{
    return this.http.put<Object>(environment.serverUrl + '/orders/' + orderId, "");
  }
}
