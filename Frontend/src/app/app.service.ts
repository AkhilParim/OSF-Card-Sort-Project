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
    // {'label': 'Mail', 'x': 559.94921875, 'y': 155.6015625, 'zIndex': 0, tokens: new Set()},
    // {'label': 'Gear', 'x': 753.6953125, 'y': 165.98046875, 'zIndex': 0, tokens: new Set()},
    // {'label': 'Shield', 'x': 116.8515625, 'y': 40.43359375, 'zIndex': 0, tokens: new Set()},
    // {'label': 'Filter', 'x': 204.640625, 'y': 257.1171875, 'zIndex': 0, tokens: new Set()}
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
