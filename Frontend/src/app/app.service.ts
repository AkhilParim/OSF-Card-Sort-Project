import { Injectable, OnInit } from '@angular/core';
import { ICardsData, IPlacedCard, ITokens } from './app.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  constructor(private activatedRoute: ActivatedRoute) { }

  public sessionStorage = sessionStorage;
  redirectedFromOCC: boolean = false;

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

  checkQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      let redirect = params['redirect'];
      let userId = params['id'];
      if(redirect == 'true') {
        this.redirectedFromOCC = true;
        if(userId) {
          this.sessionStorage.setItem("userId", userId);
        } else {
          this.sessionStorage.setItem("userId", '');
        }
      }
    });
  }

  asIsOrder(a: any, b:any) {    // used to preserve order of json objects
    return 1;
  }
}
