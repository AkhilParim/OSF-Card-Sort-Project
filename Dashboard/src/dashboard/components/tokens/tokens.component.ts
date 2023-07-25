import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js/auto"
import { DashboardService } from 'src/dashboard/dashboard.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  
  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.makeChart('Angry', '#FEC844');
    this.makeChart('Frustrating', '#709AD1');
    this.makeChart('Okay', '#276172');
    this.makeChart('Great', '#A165B8');
  }

  makeChart(chartType: string, backgroundColor: string) {
    new Chart(chartType, {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.service.tokens[chartType]),
        datasets: [{
          label: chartType,
          data: Object.values(this.service.tokens[chartType]),
          borderWidth: 0,
          backgroundColor: [
            "#FEC844",
            "#709AD1",
            "#276172",
            "#A165B8"
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
