import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader, AgmMap, MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';


@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  lat = 41.85;
  lng = -87.65

  private wayPoints = [];

  @ViewChild('mapComponent')
  private mapComponent: AgmMap;


  constructor(private mapsLoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
  }


  placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    map.panTo(latLng);
    this.wayPoints.push(latLng);
  }

  mapClicked(eventData: MouseEvent) {
    this.wayPoints.push({
      lat: eventData.coords.lat,
      lng: eventData.coords.lng
    });
  }

  async showRoute() {
    await this.mapsLoader.load();

    const wrapper =  this.mapComponent["_mapsWrapper"] as GoogleMapsAPIWrapper;
    const map = await wrapper.getNativeMap();
  
    const directionsDisplay = new google.maps.DirectionsRenderer;


    const directionsService = new google.maps.DirectionsService;

    let intermediatePoints = this.wayPoints.slice(1, this.wayPoints.length - 2);

    let dirRequest: google.maps.DirectionsRequest = {
      origin: this.wayPoints[0].location,
      destination: this.wayPoints[this.wayPoints.length - 1].location,
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
