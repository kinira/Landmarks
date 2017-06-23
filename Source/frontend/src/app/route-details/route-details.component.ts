import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})

export class RouteDetailsComponent implements OnInit {

  constructor(private mapsLoader: MapsAPILoader) { }

  ngOnInit() {
    this.prepareMap();
  }

  async prepareMap() {
    await this.mapsLoader.load();
    
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const mapElement = document.getElementById('routeMap');
    const map = new google.maps.Map(mapElement, {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 }
    });

    directionsDisplay.setMap(map);

    const mode = 'DRIVING';
    const directionsService = new google.maps.DirectionsService;

    let wayPoints: google.maps.DirectionsWaypoint[] = [
      {
        location: new google.maps.LatLng(43.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(44.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(45.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(46.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(47.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(48.658197, -73.636333),
        stopover: true
      },
      {
        location: new google.maps.LatLng(49.658197, -73.636333),
        stopover: true
      }];


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
  }
}
