import { Component } from '@angular/core';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { Chart } from "chart.js/auto";

@Component({
  selector: 'app-most-important',
  templateUrl: './most-important.component.html',
  styleUrls: ['./most-important.component.scss']
})
export class MostImportantComponent {

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.makeChart();
  }

  makeChart() {
    new Chart('important', {
      type: 'bar',
      data: {
        labels: Object.keys(this.service.importantCards),
        datasets: [{
          label: 'Most top 3 important cards',
          data: Object.values(this.service.importantCards),
          borderWidth: 0,
          backgroundColor: '#3963B9'
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
