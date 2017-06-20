import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/forms';
import { RegisterModel } from './models/RegisterModel';
import { Http } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new RegisterModel();

  searchTerms = new Subject<string>();

  serverErrors: Map<string, string>;

  isUserTaken = Observable.of(false);

  constructor(private http: Http) { }

  ngOnInit() {
    this.isUserTaken = this.searchTerms
      .debounceTime(200)        // wait 200ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(username => {
        if (!username) return Observable.of(false);
        else return this.http.get(`/api/users/isTaken/${username}`).map(resp => resp.json().taken as Boolean);
      })
      .catch(error => Observable.of(false));
  }


  checkUsername = () => this.searchTerms.next(this.model.username);
  

  register() {
    this.http.post('/api/register', this.model).subscribe(
      response => {
        if (response.status == 400) {
          // attach the errors
        } else {
          // Handle success
        }
        console.log(response);
      },
      err => console.log(err)
    );
  }
}
