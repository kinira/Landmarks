import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
declare var google: any;

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  keyword: string;

  constructor() { }

  ngOnInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {

    $(document).ready(function () {
      var searchBox = document.getElementById('search');
      var autocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */ searchBox,
        { types: ['geocode'] });
    })
  }

}
