import { Component } from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent {

  // Dummy card data for building the carousel initially 
  cardIndex = 0;

  cards = [
    {
      title: 'Card 1',
      subtitle: 'Subtitle 1',
      imageUrl: 'attach_money',
    },
    {
      title: 'Card 2',
      subtitle: 'Subtitle 2',
      imageUrl: 'library_books',
    },
    {
      title: 'Card 3',
      subtitle: 'Subtitle 3',
      imageUrl: 'calendar_today',
    },
    {
      title: 'Card 4',
      subtitle: 'Subtitle 4',
      imageUrl: 'directions_car',
    },
    {
      title: 'Card 5',
      subtitle: 'Subtitle 5',
      imageUrl: 'home',
    },
    {
      title: 'Card 6',
      subtitle: 'Subtitle 6',
      imageUrl: 'computer',
    },
  ];



}
