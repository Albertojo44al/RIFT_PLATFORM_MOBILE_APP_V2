import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';;
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isloggedIn: boolean = true;
  constructor(private authService: AuthService,private router: Router) { }

  login() {
    const response = this.authService.login(this.username, this.password);
    if(response){
      console.log('Usuario correcto!');
      this.router.navigate(['/tabs/images'])
    }else{
      this.isloggedIn = false;
      console.log('Usuario no valido');
    }
  }


  ngOnInit() {}

}
