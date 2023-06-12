import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultUsers = [
    {
      username: 'admin',
      password: 'admin',
      role: {
        id: 1,
        name: "admin"
      }
    },
    {
      username: 'participant',
      password: 'participant',
      role: {
        id: 2,
        name: "participant"
      }
    }
  ];
  constructor(private http: HttpClient ) { }

  login(username: string, password: string): boolean{
    let isCorrect = false;
    this.defaultUsers.forEach(user => {
      if(username === user.username && password === user.password){
        isCorrect =  true
        localStorage.setItem("userData", JSON.stringify(user));
      }
    });
    return isCorrect;
  }
}

