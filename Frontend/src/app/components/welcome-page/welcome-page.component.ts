import { HttpService } from 'src/app/http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(private router: Router, private httpService: HttpService) { }

  start() {
    this.httpService.createParticipation().subscribe(res => {
      if(res && res.participationId) {
        sessionStorage.setItem("participationId", res.participationId);
        this.router.navigate(['/home']);
      }
      else {
        // show error message
      }
    });
  }

}
