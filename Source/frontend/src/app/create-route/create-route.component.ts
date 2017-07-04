import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader, AgmMap, MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';


@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})

export class CreateRouteComponent implements OnInit {
  map: google.maps.Map;

  private wayPoints: google.maps.DirectionsWaypoint[];

  @Input()
  city: string = "Sofia";

  constructor(private mapsLoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.wayPoints = [];
    this.prepareMap();
  }

  async prepareMap() {
    await this.mapsLoader.load();

    const directionsDisplay = new google.maps.DirectionsRenderer;
    const mapElement = document.getElementById('routeMap');

    this.map = new google.maps.Map(mapElement, {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 }
    });

    this.map.addListener('click', e => this.onMapClicked(e));
  }

  onMapClicked(eventInfo) {
    var position = <google.maps.LatLng>eventInfo.latLng;

    this.ngZone.run(() => {
      this.wayPoints.push(<google.maps.DirectionsWaypoint>{ location: position, stopover: true });
      this.addMarker(position);
    })
  }

  addMarker(position: google.maps.LatLng) {
    var marker = new google.maps.Marker({
      position: position
    });

    marker.setMap(this.map);
    this.map.panTo(position);
  }

  resetMap() {
    this.wayPoints = [];
    this.prepareMap();
  }

  saveRoute(){
    if(localStorage.currentUser)
    {
     
    }
    else
    {
      //error could not creat routes
    }
  }


  showRoute() {
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(this.map);

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
