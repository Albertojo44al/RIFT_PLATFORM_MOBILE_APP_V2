import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultUser = {
    username: 'admin',
    password: 'admin'
  };
  constructor(private http: HttpClient) { }

  login(username: string, password: string): boolean{
    if(username === this.defaultUser.username && password === this.defaultUser.password ){
      return true;
    }

    return false;
  }
}

