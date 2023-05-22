import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-discarded-cards',
  templateUrl: './discarded-cards.component.html',
  styleUrls: ['./discarded-cards.component.scss']
})
export class DiscardedCardsComponent implements OnInit {
  off: any;
  _pointerPosition: any;
  isRankPage: Boolean = false;   // differentiates between Rank and Discard pages
  isCardPlaced: Boolean = false;   // checks if card has been ranked in Rank page
  rankCoordinates: Array<any> = [];
  isTokensPage: Boolean = false;

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;

  constructor(public service: AppService) { }
  
  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('rank') && urlParams.get('rank') == 'true') {
      this.rankCoordinates = [{ label: 'Home', x: 0, y: 0, 'z-index': 0 }]
      this.isRankPage = true;
    }
  }

  drop(event: CdkDragDrop<any[]>) {  
    // handles event when discarded card is placed on the drop zone
    if (event.previousContainer === event.container) {
      return;
    }
    let y = this._pointerPosition.y -
      this.off.y - this.dropZone.nativeElement.getBoundingClientRect().top;

    let x = this._pointerPosition.x -
      this.off.x - this.dropZone.nativeElement.getBoundingClientRect().left;

    if(this.checkIfItemInBounds(x, y, event)) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.item.data.y = y;
      event.item.data.x = x;
      this.changeZIndex(event.item.data);
    }
  }

  placeCard(event: CdkDragDrop<any[]>) {
    // handles event when card in the Rank page is placed on the drop zone
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - rectZone.top;
    let x = this._pointerPosition.x - rectZone.left;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
      event.item.data.y = y;
      event.item.data.x = x;
      this.rankCoordinates = [];
      this.service.placedCards.push(event.item.data);
      this.changeZIndex(event.item.data);
      setTimeout(() => {
        this.isCardPlaced = true;
      }, 100);
    }
  }

  placeToken(event: CdkDragDrop<any[]>) {
    // handles event when a token is placed
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - this.off.y - rectZone.top;
    let x = this._pointerPosition.x - this.off.x - rectZone.left;
    console.log(x, y);
    
  }

  moved(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.service.placedCards.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
  }

  changePosition(event: CdkDragDrop<any>, field: any) {
    // handles the change of position of a card within the drop zone
    let y = +field.y + event.distance.y;
    let x = +field.x + event.distance.x;

    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement =
      event.item.element.nativeElement.getBoundingClientRect();

    if (x < 0) {
      x = 0;
    } else if (x > rectZone.width - rectElement.width) {
      x = rectZone.width - rectElement.width;
    }
    if (y < 0) {
      y = 0;
    } else if (y > rectZone.height - rectElement.height) {
      y = rectZone.height - rectElement.height;
    }
    field.x = x;
    field.y = y;
    this.service.placedCards = this.service.placedCards.sort((a, b) =>
      a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
    );
    console.log(this.service.placedCards);
  }

  checkIfItemInBounds(x: number, y: number, event: any) {
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement = event.item.element.nativeElement.getBoundingClientRect();
    const out =
      y < 0 ||
      x < 0 ||
      y > rectZone.height - rectElement.height ||
      x > rectZone.width - rectElement.width;

    return !out;
  }

}
