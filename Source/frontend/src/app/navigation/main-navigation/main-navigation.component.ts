import { Component, OnInit, NgZone } from '@angular/core';
import { } from '@types/googlemaps';
import * as $ from 'jquery';


@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  public keyword: string;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {

    $(document).ready(() => {
      var searchBox = <HTMLInputElement>document.getElementById('search');
      var autocomplete = new google.maps.places.Autocomplete(searchBox,
        { types: ['geocode'] });


      autocomplete.addListener('place_changed', _ => this.setPlace(autocomplete.getPlace()));
    })
  }

  setPlace(place: google.maps.places.PlaceResult) {
    this.ngZone.run(() => {
      this.keyword = place.name;
    })
  }
}
