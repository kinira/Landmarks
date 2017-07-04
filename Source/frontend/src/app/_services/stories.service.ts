import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Story } from "../stories/stories.model";

@Injectable()
export class StoriesService {
  constructor(private http: Http) {
  }

  loadAllStories() {
    return this.http.get('api/stories/').map( resp => resp.json().stories as Array<Story>);
  }

    byCity(city: string) {
    return this.http.get(`api/stories/${city}`).map( resp =>
      resp.json().stories as Array<Story>).toPromise();
  }

  insertStory(forInsert : Story){
    return this.http.post('api/stories', {username: forInsert.username,
                  town : forInsert.town, date: forInsert.created, 
                  text : forInsert.text})
    .toPromise().then(
      data => 
      {
      let res = data.json();
      });
  }
}