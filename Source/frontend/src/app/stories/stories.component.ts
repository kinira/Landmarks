import { Component, OnInit, Input } from '@angular/core';
import { Story } from './stories.model';
import { NgForm } from '@angular/forms/forms';
import * as SimpleMDE from "simplemde";
import * as $ from 'jquery';
import { StoriesService } from "../_services/stories.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  providers: [StoriesService]
})
export class StoriesComponent implements OnInit {
  simplemde: SimpleMDE;

  allstories: Array<Story> = [];
  isEdit: boolean;

  username: string;
  
  town: string;

  text: string;

  constructor(private storyService: StoriesService) { }

  ngOnInit() {

    this.storyService.loadAllStories().subscribe(
      arr =>
        this.allstories = arr);
    let textArea = $("#text")[0];

    this.simplemde = new SimpleMDE({ element: textArea });

  }

  onSubmit(f: NgForm) {
    let parsed = f.value;


    console.log(parsed);
    this.storyService.insertStory(new Story(4, parsed.username, parsed.town, Date.now(), this.simplemde.value()));

    console.log(JSON.stringify(f.value));
  }

  setEdit() {
    this.isEdit = true;
  }
}
