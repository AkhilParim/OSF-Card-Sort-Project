import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit {
  showPageLoader: Boolean = true;
  promptDuration: number = 10;

  constructor(private httpService: HttpService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    if(this.appService.placedCards.length > 0) { 
      this.httpService.saveParticipation().subscribe(res => {
        this.showPageLoader = false;
        this.executePrompt();
      });
    } else {
      this.showPageLoader = false;
      this.executePrompt();
    }
  }

  executePrompt() {
    let interval = setInterval(() => {
      this.promptDuration -= 1;
      if(this.promptDuration == -1) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
  
}
