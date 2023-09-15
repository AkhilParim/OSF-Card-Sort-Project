import { ICardData } from 'src/app/app.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICardsData } from './app.model';
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private appService: AppService) { }

  getCardsData() {  // this method is called on app initialisation
    return new Promise<void>((resolve, reject) => {
      this.http.get(environment.apiEndPoint).subscribe((cards) => {
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
    return this.http.post(environment.apiEndPoint + 'saveParticipation/', {
      participationId: this.appService.sessionStorage['participationId'],
      placedCards: this.appService.placedCards.map(({ zIndex, tokens, ...cardData}) => ({
        ...cardData,
        tokens: Array.from(tokens)
      })),
      discardedCards: this.appService.discardedCards,
      orderOfPlacedCards: [],
      sessionStart: this.appService.sessionStorage['sessionStart']
    });
  }

  generateNewID(collection: string): Observable<any> {
    return this.http.post(environment.apiEndPoint + 'generateNewID/', {'collection': collection});
  }
}
