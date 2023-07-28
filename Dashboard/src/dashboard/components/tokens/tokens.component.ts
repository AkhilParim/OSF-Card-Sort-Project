import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js/auto"
import { DashboardService } from 'src/dashboard/dashboard.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  keys: Array<any[]> = [];
  values: Array<any> = [];

  constructor(public service: DashboardService) { }
  
  ngOnInit() {
    // this.makeChart('Angry', '#FEC844');
    // this.makeChart('Frustrating', '#709AD1');
    // this.makeChart('Okay', '#FCFFFE');
    // this.makeChart('Great', 'FEC844');
    this.keys[0] = Object.keys(this.service.tokens['Great']).slice(0, 3);
    this.values[0] = Object.values(this.service.tokens['Great']).slice(0, 3);
    this.keys[1] = Object.keys(this.service.tokens['Okay']).slice(0, 3);
    this.values[1] = Object.values(this.service.tokens['Okay']).slice(0, 3);
    this.keys[2] = Object.keys(this.service.tokens['Frustrating']).slice(0, 3);
    this.values[2] = Object.values(this.service.tokens['Frustrating']).slice(0, 3);
    this.keys[3] = Object.keys(this.service.tokens['Angry']).slice(0, 3);
    this.values[3] = Object.values(this.service.tokens['Angry']).slice(0, 3);
    console.log(this.service.totalCount);
    console.log(this.service.tokens);
    
    
  }

  // makeChart(chartType: string, backgroundColor: string) {
  //   new Chart(chartType, {
  //     type: 'bar',
  //     data: {
  //       labels: Object.keys(this.service.tokens[chartType]).slice(0, 3),
  //       datasets: [{
  //         label: chartType,
  //         data: Object.values(this.service.tokens[chartType]).slice(0, 3),
  //         borderWidth: 1,
  //         backgroundColor: backgroundColor
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
}
