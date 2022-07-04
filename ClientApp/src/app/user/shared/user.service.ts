import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from './token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  login(login:Object) :Observable<Token> {
    return this.http.post<Token>(environment.serverUrl + '/login', login);
  }

  register(registration:Object) :Observable<Object> {
    return this.http.post<Object>(environment.serverUrl + '/register', registration);
  }

}
