import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Story } from "../stories/stories.model";

@Injectable()

export class RouteService 
{
 constructor(private http: Http) {
  }

  insertRoutes()
  {
    //   this.http.post()
  }

}