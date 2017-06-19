import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/forms';
import { RegisterModel } from './models/RegisterModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new RegisterModel();

  constructor() {
    
  }

  ngOnInit() {
  }

  register(){

  }

}
