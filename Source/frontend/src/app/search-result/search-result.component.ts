import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from '@types/googlemaps';
import { RouteService } from '../_services/route.service';
import { Route } from '../../../../backend/models/Route';
import { StoriesService } from '../_services/stories.service';
import { Story } from '../stories/stories.model';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [RouteService, StoriesService]
})


export class SearchResultComponent implements OnInit {
  routes: Route[];

  stories: Story[];

  keyword: string;

  placeId: string;

  map: any;

  service: any;

  infowindow: any;

  city: string;

  constructor(private route: ActivatedRoute, private routeService: RouteService,
    private storyService: StoriesService, private zone: NgZone, private mapsLoader: MapsAPILoader) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.keyword = params['keyword'];
      this.prepareMap();
    });
  }

  async prepareMap() {
    await this.mapsLoader.load();
    const geocoder = new google.maps.Geocoder();

    if (geocoder) {
      geocoder.geocode({ 'address': this.keyword }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          results[0].address_components.forEach(comp => {
            if (comp.types[0] == "locality")
              this.city = comp.long_name;
            return false; // break the loop
          });

          this.zone.run(() => {
            this.setPlace(results[0].geometry.location);
            this.loadRoutes();
            this.loadStories();
          });
        } else {
          console.log('Geocoding failed: ' + status);
        }
      });
    }
  }

  async loadRoutes() {
    this.routes = await this.routeService.getRoutes(this.city)
  }

  async loadStories() {
    this.stories = await this.storyService.byCity(this.city);
  }

  setPlace(location: any) {
    const mapProp = {
      center: new google.maps.LatLng(location.lat(), location.lng()),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const mapElement = document.getElementById('map');

    this.map = new google.maps.Map(mapElement, mapProp);

    // Extra services that might be useful later:
    // this.service = new google.maps.places.PlacesService(this.map);
    // this.infowindow = new google.maps.InfoWindow();
  }

}
