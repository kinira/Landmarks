import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  public keyword: string;

  constructor(private ngZone: NgZone, private mapsLoader: MapsAPILoader) {
  }

  ngOnInit() {
    this.initAutocomplete();
  }

  async initAutocomplete() {
    await this.mapsLoader.load();
    var searchBox = <HTMLInputElement>document.getElementById('search');
    var autocomplete = new google.maps.places.Autocomplete(searchBox,
      { types: ['geocode'] });


    autocomplete.addListener('place_changed', _ => this.setPlace(autocomplete.getPlace()));
  }

  setPlace(place: google.maps.places.PlaceResult) {
    this.ngZone.run(() => {
      this.keyword = place.name;
    })
  }
}
