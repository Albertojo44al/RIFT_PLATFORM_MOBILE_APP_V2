import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  login() {
    const response = this.authService.login(this.username, this.password);
    if(response){
      console.log('Usuario correcto!');
    }else{
      console.log('Usuario no valido');
    }
  }


  ngOnInit() {}

}
