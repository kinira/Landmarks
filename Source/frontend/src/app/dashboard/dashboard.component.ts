import { Component, OnInit } from '@angular/core';
import { Dashboard } from './dashboard.model';
import { DashboardService } from "app/_services/dashboard.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit {
visited: Array<Dashboard>;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

      this.dashboardService.loadDashboard().then(data => this.visited = data);
  }

}
