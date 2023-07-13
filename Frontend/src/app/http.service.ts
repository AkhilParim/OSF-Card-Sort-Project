import { ICardData } from 'src/app/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICardsData } from './app.model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = 'http://3.131.110.250:3000/'

  constructor(private http: HttpClient, private appService: AppService) { }

  getCardsData() {  // this method is called on app initialisation
    return new Promise<void>((resolve, reject) => {
      this.http.get(this.baseUrl).subscribe((cards) => {
        this.appService.cardsData = JSON.parse(JSON.stringify(cards));
        this.appService.localCardsForHome = Object.keys(this.appService.cardsData).filter(card => {
          return this.appService.placedCards.some(x => {
            return x && x.label != card
          }) || true;
        });
        resolve();
      });
    });
  }

  saveParticipation() {
    return this.http.post(this.baseUrl, {
      placedCards: this.appService.placedCards.map(({ zIndex, tokens, ...cardData}) => ({
        ...cardData,
        tokens: Array.from(tokens)
      })),
      discardedCards: this.appService.discardedCards
    });
  }
}
