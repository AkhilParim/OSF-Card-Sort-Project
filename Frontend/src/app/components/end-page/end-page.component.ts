import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit {
  showPageLoader: Boolean = true;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.saveParticipation().subscribe(res => {
      this.showPageLoader = false;
    });
  }


}
