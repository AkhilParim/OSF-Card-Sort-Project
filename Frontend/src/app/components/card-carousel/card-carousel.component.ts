import { Component } from '@angular/core';
import { cards } from 'src/app/models/constants';
@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
})
export class CardCarouselComponent {
  // Dummy card data for building the carousel initially
  cardIndex = 0;

  cards = cards;
}
