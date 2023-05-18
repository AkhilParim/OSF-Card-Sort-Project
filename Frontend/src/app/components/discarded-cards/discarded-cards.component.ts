import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragMove,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-discarded-cards',
  templateUrl: './discarded-cards.component.html',
  styleUrls: ['./discarded-cards.component.scss']
})
export class DiscardedCardsComponent implements OnInit {
  done: Array<any> = [];
  todo: Array<any> = [];
  off: any;
  _pointerPosition: any;
  isRankPage: Boolean = true;   // differentiates between Rank and Discard pages
  isCardPlaced: Boolean = false;   // checks if card has been ranked in Rank page
  cardData: Array<any> = [];

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;

  ngOnInit(): void {
    this.todo = [
      { label: 'Home1', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home2', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home3', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home4', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home5', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home6', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home7', x: 0, y: 0, 'z-index': 0 },
      { label: 'Home8', x: 0, y: 0, 'z-index': 0 },
    ];

    this.cardData = [{ label: 'Home', x: 0, y: 0, 'z-index': 0 }]
  }

  drop(event: CdkDragDrop<any[]>) {  
    // handles event when card is dropped in Discard page
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
    // handles event when card is dropped in Rank page
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - rectZone.top;
    let x = this._pointerPosition.x - rectZone.left;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
      event.item.data.y = y;
      event.item.data.x = x;
      this.cardData = [];
      this.done.push(event.item.data);
      this.changeZIndex(event.item.data);
      setTimeout(() => {
        this.isCardPlaced = true;
      }, 100);
    }
  }

  moved(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.done.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
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
    this.done = this.done.sort((a, b) =>
      a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
    );
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
