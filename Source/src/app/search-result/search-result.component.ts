import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})


export class SearchResultComponent implements OnInit {
  keyword: string;
  placeId: string;
  map: any;
  service: any;
  infowindow: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.keyword = params['keyword'];

      $(document).ready(_ => {
        this.prepareMap();
      })
    });
  }

  prepareMap() {
    var geocoder = new google.maps.Geocoder();

    if (geocoder) {
      geocoder.geocode({ 'address': this.keyword }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.setPlace(results[0].geometry.location);
        }
        else {
          console.log("Geocoding failed: " + status);
        }
      });
    }
  }

  setPlace(location: any) {
    var mapProp = {
      center: new google.maps.LatLng(location.lat(), location.lng()),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('map');

    this.map = new google.maps.Map(mapElement, mapProp);

    // Extra services that might be useful later:
    //this.service = new google.maps.places.PlacesService(this.map);
    //this.infowindow = new google.maps.InfoWindow();
  }

}
