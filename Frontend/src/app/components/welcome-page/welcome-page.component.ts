import { AppService } from 'src/app/app.service';
import { HttpService } from 'src/app/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router, private httpService: HttpService, private appService: AppService) { }

  ngOnInit(): void {
    this.appService.checkQueryParams();
  }

  checkIdentity() {
    if(this.appService.redirectedFromOCC && !sessionStorage['userId']) {
      return false
    }
    return true;
  }


  start() {
    if(this.checkIdentity()) {
      sessionStorage.setItem("sessionStart", String(new Date().getTime()));
      this.router.navigate(['/home']);
    } else {
      // show error message
      console.log('no ID');
      
    }
  }

}
