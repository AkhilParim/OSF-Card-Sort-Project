import { HttpService } from 'src/http.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/dashboard/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public service: DashboardService) { }
  currentChart: 'tokens' | 'discarded' | 'important' = 'tokens';

  ngOnInit(): void {
    this.service.getData();
  }
}
