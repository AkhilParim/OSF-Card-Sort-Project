import { Component } from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
})
export class CardCarouselComponent {
  // Dummy card data for building the carousel initially
  cardIndex = 0;

  cards = [
    {
      title: 'Card 1',
      subtitle: 'Subtitle 1',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl: 'attach_money',
    },
    {
      title: 'Card 2',
      subtitle: 'Subtitle 2',
      imageUrl: 'library_books',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Card 3',
      subtitle: 'Subtitle 3',
      imageUrl: 'calendar_today',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Card 4',
      subtitle: 'Subtitle 4',
      imageUrl: 'directions_car',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Card 5',
      subtitle: 'Subtitle 5',
      imageUrl: 'home',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Card 6',
      subtitle: 'Subtitle 6',
      imageUrl: 'computer',
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];
}
