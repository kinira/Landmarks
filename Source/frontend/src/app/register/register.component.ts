import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/forms';
import { RegisterModel } from './models/RegisterModel';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new RegisterModel();

  error: string;

  constructor(private http: Http) {

  }

  ngOnInit() {
  }

  register() {
    this.http.post('/api/register', this.model).subscribe(
      response => {
          console.log(response);
      },
      err => this.error = err
    );
  }

}
