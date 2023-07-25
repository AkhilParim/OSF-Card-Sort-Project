import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { Chart } from "chart.js/auto"

@Component({
  selector: 'app-most-discarded',
  templateUrl: './most-discarded.component.html',
  styleUrls: ['./most-discarded.component.scss']
})
export class MostDiscardedComponent implements OnInit {

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.makeChart();
  }

  makeChart() {
    new Chart('discarded', {
      type: 'bar',
      data: {
        labels: Object.keys(this.service.discardedCards),
        datasets: [{
          label: 'Most discarded cards',
          data: Object.values(this.service.discardedCards),
          borderWidth: 0,
          backgroundColor: '#FF0000'
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
