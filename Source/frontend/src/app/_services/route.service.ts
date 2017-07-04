import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Story } from "../stories/stories.model";

import { } from '@types/googlemaps';
import { AuthHttp } from 'angular2-jwt';
import { Route } from '../../../../backend/models/Route';

@Injectable()
export class RouteService {

  constructor(private http: AuthHttp) {
  }

  insertRoutes(city: String, description: string, summary: string, wayPoints: google.maps.LatLng[]) {
    let pPoints = wayPoints.map(loc => { return { lat: loc.lat(), lng: loc.lng() }; });
    let data = { city: city, description: description, summary: summary, waypoints: pPoints };

    return this.http.post('api/routes', data)
      .map(resp => resp.json())
      .toPromise();
  }

  getRoutes(city: String) {
    return this.http.get(`/api/routes/${city}`).map(resp => {
      let data = resp.json();
      let result: Route[] = [];
      for (var key in data) {
        result.push(data[key] as Route);
      }
      return result;
    })
      .toPromise();
  }

  getRoute(id: number) {
    return this.http.get(`/api/routes/byId/${id}`).map(resp => resp.json() as Route).toPromise();
  }

}