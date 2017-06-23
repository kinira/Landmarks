import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Dashboard } from "app/dashboard/dashboard.model";

@Injectable()

export class DashboardService {
      constructor(private http: Http) {
    }

   loadDashboard()
    {
      return this.http.get('api/dashboard/').toPromise()
      .then(
        data => {
         let citiesData = data.json();
         let mapped = new Array<Dashboard>();
         citiesData.forEach(el => {
           mapped.push(new Dashboard(el.city,el.storiesAbout))
         });
         return mapped;
        }
      );
    }

}