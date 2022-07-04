import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }

  addProduct(product:Object) :Observable<Object> {
    return this.http.post<Object>(environment.serverUrl + '/product', product);
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.serverUrl+ '/product');
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(environment.serverUrl+ '/product/' + id);
  }

}
