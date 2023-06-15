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

  constructor(private http: HttpClient, private appService: AppService) { }

  getCardsData() {  // this method is called on app initialisation
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost:3000/').subscribe((cards) => {
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
    return this.http.post('http://localhost:3000/', {
      placedCards: this.appService.placedCards,
      discardedCards: this.appService.discardedCards
    });
  }
}
