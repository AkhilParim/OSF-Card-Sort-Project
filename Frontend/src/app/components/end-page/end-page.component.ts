import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit {
  showPageLoader: Boolean = true;

  constructor(private httpService: HttpService, private appService: AppService) { }

  ngOnInit(): void {
    if(this.appService.placedCards.length > 0) { 
      this.httpService.saveParticipation().subscribe(res => {
        this.showPageLoader = false;
      });
    } else {
      this.showPageLoader = false;
    }
  }


}
