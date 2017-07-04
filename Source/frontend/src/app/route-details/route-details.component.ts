import { RouteService } from '../_services/route.service';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../../../backend/models/Route';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
  providers: [RouteService]
})

export class RouteDetailsComponent implements OnInit {
  routeId: any;

  model: Route;

  constructor(private route: ActivatedRoute, private routeService: RouteService, private mapsLoader: MapsAPILoader) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['routeId'];
      this.prepareMap();
    });
  }

  async prepareMap() {
    this.model = await this.routeService.getRoute(this.routeId);
    let wayPoints = this.model.waypoints.map(w =>
    { return { location: new google.maps.LatLng(w.lat, w.lng), stopover: false } as google.maps.DirectionsWaypoint });

    await this.mapsLoader.load();

    const directionsDisplay = new google.maps.DirectionsRenderer;
    const mapElement = document.getElementById('routeMap');
    let map: google.maps.Map;


    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.model.city }, (results, status) => {
      let location = results[0].geometry.location;

      map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: { lat: location.lat(), lng: location.lng() }
      });

      directionsDisplay.setMap(map);

      const mode = 'DRIVING';
      const directionsService = new google.maps.DirectionsService;

      let intermediatePoints = wayPoints.slice(1, wayPoints.length - 2);

      let dirRequest: google.maps.DirectionsRequest = {
        origin: wayPoints[0].location,
        destination: wayPoints[wayPoints.length - 1].location,
        waypoints: intermediatePoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(dirRequest, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    });
  }
}
