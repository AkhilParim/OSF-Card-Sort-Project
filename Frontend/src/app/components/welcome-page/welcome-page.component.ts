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
    this.httpService.generateNewID('OSF').subscribe(res => {
      if(res && res.participationId) {
        sessionStorage.setItem("participationId", res.participationId);
        sessionStorage.setItem("sessionStart", String(new Date().getTime()));
        this.router.navigate(['/home']);
      }
      else {
        // show error message
      }
    });
  }

}
