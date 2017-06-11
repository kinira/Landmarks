import { Component, OnInit } from '@angular/core';
import { Dashboard } from './dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
visited: Array<Dashboard>;
  constructor() { }

  ngOnInit() {
      this.visited = [new Dashboard('Sofia', 'Bulgaria', 1012),
                      new Dashboard('Prague', 'Czech', 120) ];
  }

}
