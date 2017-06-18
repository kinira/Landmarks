import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  error: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  async login() {
    try {
      this.error = "loading...";

      var isSuccess = await this.loginService.login(this.username, this.password);
      if (isSuccess) {
        this.router.navigateByUrl('/');
      } else {
        this.error = "failed to login";
      }
    } catch (err) {
      this.error = "login failed";
      console.log('failed to login: ' + err); 
    }
  }
}
