import { Injectable, OnInit } from '@angular/core';
import { ICardsData, IPlacedCard, ITokens } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor() { }
  
  displayCardIndex: number = 0;

  cardsData: ICardsData = {
    'Home': {
      label: 'Home',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'home',
      content: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'File': {
      label: 'File',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'file-solid',
      content: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Gear': {
      label: 'Gear',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'gear-solid',
      content: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Shield': {
      label: 'Shield',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'shield-solid',
      content: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    'Filter': {
      label: 'Filter',
      preview: 'L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'filter-solid',
      content: `L. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
  }
  
  placedCards: Array<IPlacedCard> = [
    // {'label': 'File', 'x': 559.94921875, 'y': 155.6015625, 'z-index': 0, tokens: new Set()},
    // {'label': 'Gear', 'x': 753.6953125, 'y': 165.98046875, 'z-index': 0, tokens: new Set()},
    // {'label': 'Shield', 'x': 116.8515625, 'y': 40.43359375, 'z-index': 0, tokens: new Set()},
    // {'label': 'Filter', 'x': 204.640625, 'y': 257.1171875, 'z-index': 0, tokens: new Set()}
  ]
  
  discardedCards: Array<string> = []
  
  tokens: ITokens = {
    'Angry': { label: 'Angry', color: '#931F1D' },
    'Frustrating': { label: 'Frustrating', color: '#3F6DA4' },
    'Okay': { label: 'Okay', color: '#DC851F' },
    'Great': { label: 'Great', color: '#417B5A' }
  }
  
  localCardsForHome: Array<string> = Object.keys(this.cardsData).filter(card => {
    return this.placedCards.some(x => {
      return x && x.label != card
    }) || true;
  });

  disableRotatingBorder(disable: Boolean) {
    const borderElements = Array.from(document.getElementsByClassName('rotating-border') as HTMLCollectionOf<HTMLElement>);
    borderElements.forEach(ele => {
      ele.style.display = disable ? 'none' : 'flex';
    });
  }
}
