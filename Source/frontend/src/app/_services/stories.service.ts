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
    return this.http.get('api/stories/').toPromise()
      .then(
      data => {
        let storiesData = data.json();
        let mapped = new Array<Story>();
        for (let el of storiesData.stories){
           mapped.push(new Story(el.id, el.username, el.town, el.created, el.text))
        }
        // storiesData.forEach(el => {
        //   mapped.push(new Story(el.id, el.username, el.town, el.created, el.text))
        // });
        return mapped;
      }
      );
  }
}