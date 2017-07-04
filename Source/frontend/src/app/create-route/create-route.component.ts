import { RouteService } from '../_services/route.service';
import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader, AgmMap, MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  providers: [RouteService]
})

export class CreateRouteComponent implements OnInit {
  map: google.maps.Map;

  public summary: string = "summary";

  public description: string = "description";

  private wayPoints: google.maps.DirectionsWaypoint[];

  @Input()
  city: string;

  constructor(private mapsLoader: MapsAPILoader, private ngZone: NgZone,
    private router: Router, private route: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit() {
    this.wayPoints = [];

    this.route.params.subscribe(params => {
      this.city = params['city'];
      this.prepareMap();
    });
  }

  async prepareMap() {
    await this.mapsLoader.load();

    const geocoder = new google.maps.Geocoder();
    const mapElement = document.getElementById('routeMap');
    geocoder.geocode({ 'address': this.city }, (results, status) => {
      let location = results[0].geometry.location;

      this.map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: { lat: location.lat(), lng: location.lng() }
      });

      this.map.addListener('click', e => this.onMapClicked(e));
    });
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

  saveRoute() {
    if (localStorage.currentUser) {
      let userName = localStorage.currentUser;

      let wayPoints = this.wayPoints.map(w => <google.maps.LatLng>w.location);

      this.routeService.insertRoutes(this.city, this.description, this.summary, wayPoints)
        .then(_ => this.router.navigateByUrl(`/search/${this.city}`))
        .catch(err => alert(err));
    }
    else {
      // redirect to login
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
