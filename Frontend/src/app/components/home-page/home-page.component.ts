import { Component } from '@angular/core';
import { cards } from 'src/app/models/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  usedCards = cards;
  
}
