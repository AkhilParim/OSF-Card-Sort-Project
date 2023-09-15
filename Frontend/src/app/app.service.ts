import { Injectable, OnInit } from '@angular/core';
import { ICardsData, IPlacedCard, ITokens } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor() { }
  public sessionStorage = sessionStorage;

  displayCardIndex: number = 0;

  cardsData: ICardsData = {}
  
  placedCards: Array<IPlacedCard> = []
  
  discardedCards: Array<string> = []
  
  tokens: ITokens = {
    'Angry': { label: 'Angry', color: '#931F1D' },
    'Frustrating': { label: 'Frustrating', color: '#3F6DA4' },
    'Okay': { label: 'Okay', color: '#DC851F' },
    'Great': { label: 'Great', color: '#417B5A' }
  }

  localCardsForHome: Array<string> = [];

  orderOfPlacedCards: Array<string> = [];

  disableRotatingBorder(disable: Boolean) {
    const borderElements = Array.from(document.getElementsByClassName('rotating-border') as HTMLCollectionOf<HTMLElement>);
    borderElements.forEach(ele => {
      ele.style.display = disable ? 'none' : 'flex';
    });
  }

  asIsOrder(a: any, b:any) {    // used to preserve order of json objects
    return 1;
  }
}
