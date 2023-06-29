import { Injectable, OnInit } from '@angular/core';
import { ICardsData, IPlacedCard, ITokens } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor() { }
  
  displayCardIndex: number = 0;

  cardsData: ICardsData = {}
  
  placedCards: Array<IPlacedCard> = [
      // { "label": "Food", "x": 106.2265625, "y": 41, "zIndex": 0, "tokens": new Set() },
      // { "label": "Friends", "x": 190.2265625, "y": 158, "zIndex": 0, "tokens": new Set() },
      // { "label": "Home", "x": 296.2265625, "y": 292, "zIndex": 0, "tokens": new Set() },
      // { "label": "Physical health", "x": 440.2265625, "y": 104, "zIndex": 0, "tokens": new Set() },
      // { "label": "Support system", "x": 763.2265625, "y": 140, "zIndex": 0, "tokens": new Set() },
      // { "label": "Mental health", "x": 580.2265625, "y": 252, "zIndex": 1, "tokens": new Set() }
  ]
  
  discardedCards: Array<string> = []
  
  tokens: ITokens = {
    'Angry': { label: 'Angry', color: '#931F1D' },
    'Frustrating': { label: 'Frustrating', color: '#3F6DA4' },
    'Okay': { label: 'Okay', color: '#DC851F' },
    'Great': { label: 'Great', color: '#417B5A' }
  }
  
  localCardsForHome: Array<string> = [];

  disableRotatingBorder(disable: Boolean) {
    const borderElements = Array.from(document.getElementsByClassName('rotating-border') as HTMLCollectionOf<HTMLElement>);
    borderElements.forEach(ele => {
      ele.style.display = disable ? 'none' : 'flex';
    });
  }
}
