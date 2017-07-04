import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Story } from "../stories/stories.model";

import { } from '@types/googlemaps';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RouteService {

  constructor(private http: AuthHttp) {
  }

  insertRoutes(city: String, wayPoints: google.maps.LatLng[]) {
    let pPoints = wayPoints.map(loc => { return { lat: loc.lat(), lng: loc.lng() }; });
    return this.http.post('api/routes', { city: city, waypoints: pPoints })
      .map(resp => resp.json())
      .toPromise();
  }

  getRoutes = (city: String) =>
    this.http.get(`/api/routes/${city}`).map(resp => resp.json()).toPromise();

}