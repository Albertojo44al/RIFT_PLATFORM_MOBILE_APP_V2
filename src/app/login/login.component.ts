import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';;
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isloggedIn = true;
  constructor(private authService: AuthService,private router: Router) { }

  login() {
    const response = this.authService.login(this.username, this.password);
    if(response){
      console.log('Usuario correcto!');
      let user = JSON.parse(localStorage.getItem("userData"));
      
      if (user["role"]["id"] != 1){
        this.router.navigate(['/scoreboard']);
      }else{
        this.router.navigate(['/tabs/images']);
      }
    }else{
      this.isloggedIn = false;
      console.log('Usuario no valido');
    }
  }


  ngOnInit() {}

}
