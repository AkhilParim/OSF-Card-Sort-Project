import { Injectable, OnInit } from "@angular/core";
import { forkJoin, map } from 'rxjs';
import { HttpService } from "../http.service";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    participations: any;
    cards: {
        [CardName: string]: number
    } = {};
    tokens: any = { 'Frustrating': {}, 'Great': {}, 'Okay': {}, 'Angry': {} }
    isLoading: boolean = true;
    discardedCards: any = {};
    importantCards: any = {};

    constructor(private httpService: HttpService) { }
    
    getData() {
    forkJoin([this.httpService.getCardsData(), this.httpService.getParticipationData()])
      .subscribe(([cards, participations]) => {
        Object.keys(cards).forEach(card => {
          this.cards[card] = 0;
        });
        this.participations = participations;
        this.isLoading = false;
        this.callFunctions();
      });
  }

    async callFunctions() {
        if (!this.participations.length) { return }
        // this.calculateTokens();
        await this.participations.forEach((_part: any) => {
            this.calculateTokens([..._part.placedCards]);
            this.calculateDiscardedCards([..._part.discardedCards]);
            this.calculateImportantCards([..._part.placedCards]);
        });

        // sorting tokens object
        Object.keys(this.tokens).forEach(key => {
            const arr: Array<any> = Object.entries(this.tokens[key]);
            arr.sort((a, b) => b[1] - a[1]);
            const sortedObj = Object.fromEntries(arr);
            this.tokens[key] = sortedObj;
        });

        // sorting discarded cards object
        const disc = Object.entries(this.discardedCards).sort((a: any, b: any) => b[1] - a[1]);
        this.discardedCards = Object.fromEntries(disc);

        // sorting important cards array
        const imp = Object.entries(this.importantCards).sort((a: any, b: any) => b[1] - a[1]);
        this.importantCards = Object.fromEntries(imp);
        
    }

    calculateTokens(cards: Array<any>) {
        cards.forEach((_card: any) => {
            _card.tokens.forEach((_token: string) => {
                let num = this.tokens[_token];
                if (num[_card.label]) {
                    num[_card.label] += 1
                } else {
                    num[_card.label] = 1;
                }
            });
        });
    }

    calculateDiscardedCards(cards: Array<string>) {
        cards.forEach((card) => {
            if(this.discardedCards[card]) {
                this.discardedCards[card] += 1;
            } else {
                this.discardedCards[card] = 1;
            }
        });
    }

    calculateImportantCards(cards: Array<any>) {
        cards.sort((a: any, b: any) => b.x - a.x);
        for(let i=0; i < 3; i++) {
            if(i > cards.length - 1) { break }
            if(!this.importantCards[cards[i].label]) {
                this.importantCards[cards[i].label] = 1
            } else {
                this.importantCards[cards[i].label] += 1;
            }
        }
        
    }

}

