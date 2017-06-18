import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    return this.http.post('/api/login', { username : username, password: password })
      .toPromise()
      .then(data => {
        // login successful if there's a jwt token in the response
        let token = data.json() && data.json().token;
        if (token) {
          // set token property
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username }));
          localStorage.setItem('token', JSON.stringify(token));

          return true;
        } else {
          return false;
        }
      });
  }
  getCurrentUsername = () => localStorage.getItem('currentUser');

  isLoggedIn = () => this.getCurrentUsername() ? true : false;


}
