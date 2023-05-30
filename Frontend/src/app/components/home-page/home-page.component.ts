import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent {

  @Input() appLongPressDiscard: any ; 

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;


  localUsedCards: Array<any> = [];

  localAllCards: any; 
  allCardArray: Array<any> = [];
  localDiscardedCards: Array<any> = [];

  constructor(public appService: AppService) { 
  }

  ngOnInit(): void {
    this.localUsedCards = this.appService.usedCards.map(ele => ele);
    this.localAllCards = this.appService.cardsData;
    this.localDiscardedCards = this.appService.discardedCards;
    this.allCardArray = Object.values(this.localAllCards);
    console.log(this.localAllCards);
    console.log(this.allCardArray);
  }

  onLongPressDiscard(card: any,index : any, event: any): void {
    console.log('The long press event was fired!');
    console.log('The discarded card is: ', card);
    console.log('The discarded card index is: ', index);
    console.log('The discarded card event is: ', event);

    // add the card to the discarded cards array in service as well as in the component list


    this.appService.discardedCards.push(card.label);
    this.localDiscardedCards.push(card.label);
    this.localUsedCards = this.appService.usedCards.map(ele => ele);
  }

  isDiscardedCheck(card : any){

    if(this.localDiscardedCards.includes(card.label))    
      return 'discarded-overlay';
    else
      return '';
  }
}
