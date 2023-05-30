import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ICardData, ICurrentPageAndState, IPlacedCard, PageTypes, StateTypes } from 'src/app/app.model';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  off: any;
  _pointerPosition: any;
  isCardPlaced: Boolean = false;   // checks if card has been placed in drop zone in Rank page
  localDiscardedCards!: Array<string>;
  localPlaced!: Array<IPlacedCard>;
  displayCardData!: ICardData;  // data of the card that is displayed in Rank page
  currentPageAndState: ICurrentPageAndState = {
    page: '',  // pages = 'rank' or 'token' or 'summary'
    state: ''  // statesOfSummaryPage = 'discardedCards' or 'reposition',     statesOfTokensPage = 'tokenSummary' or 'tokenChanges'
  };
  isLastCard: Boolean = this.service.placedCards.length + this.service.discardedCards.length + 1 >= Object.keys(this.service.cardsData).length;

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;

  constructor(public service: AppService, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.currentPageAndState.page = String(this.router.url.split('/').slice(-1)) as PageTypes;
    if(this.currentPageAndState.page == 'rank') {
      this.displayCardData = this.service.cardsData[this.service.displayCard];  
    } else {  // Summary Page
      this.localDiscardedCards = this.service.discardedCards.map(ele => ele);   // cloning todo cards
    }
    this.localPlaced = this.service.placedCards.map(ele => ele);  // cloning placed cards
    this.localPlaced.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0));  // sorting based on x-coordinates
  }

  placeCard(event: CdkDragDrop<any[]>) {
    // handles event when card in the Rank page is placed on the drop zone
    if (event.previousContainer === event.container) {
      return;
    }

    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let x = this._pointerPosition.x - this.off.x - rectZone.left;
    let y = this._pointerPosition.y - this.off.y - rectZone.top;

    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
      let coordinates: IPlacedCard = { 'label': event.item.data, 'x': x, 'y': y, 'z-index': 0, tokens: new Set() }
      if(this.currentPageAndState.page == 'summary') {
        this.localDiscardedCards = this.localDiscardedCards.filter(card => card != String(event.item.data));
      }
      this.localPlaced.push(coordinates);
      this.changeZIndex(coordinates);
      this.isCardPlaced = true;
    }
  }

  placeToken(event: CdkDragDrop<any[]>) {
    // handles event when a token is placed
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - this.off.y - rectZone.top;
    let x = this._pointerPosition.x - this.off.x - rectZone.left;

    for(var i = 0; i < this.localPlaced.length; i++) {
      let ele = this.localPlaced[i];
      if(((ele.x < x && x < ele.x+50) || (ele.x < x+40 && x+40 < ele.x+50))
        && ((ele.y < y && y < ele.y+50) || (ele.y < y+40 && y+40 < ele.y+50))) {   // checking if token is placed on any card
        this.localPlaced[i].tokens.add(event.item.data.label);
        break;
      };
    };
  }

  cardMoveListener(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.localPlaced.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
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
    this.localPlaced = this.localPlaced.sort((a, b) =>
      a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
    );
  }

  fixRankCardPosition() {
    if(!this.isLastCard) {
      this.service.placedCards = this.localPlaced.map(ele => ele);  // storing new placed cards
      this.service.discardedCards = this.service.discardedCards.filter(ele => ele != this.displayCardData.label);
      this.router.navigate(['/']);
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogBoxComponent, { data: this.currentPageAndState.page == 'token' ? 'tokens' : 'cards' });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true') {
        if(this.currentPageAndState.page != 'token') {
          this.handleSummaryNextPage();
        } else {
          this.handleTokenNextPage();
        }
      }
    });
  }

  handleSummaryNextPage() {
    // handles the redirection to next page from summary page
    this.service.placedCards = this.localPlaced.map(ele => ele);  // storing new placed cards
    if(this.currentPageAndState.page == 'rank') {
      this.router.navigate(['drag-and-drop/summary'])
    } else if(this.currentPageAndState.page == 'summary') {
      this.service.discardedCards = this.localDiscardedCards.map(ele => ele);  // storing new discarded cards
      this.router.navigate(['drag-and-drop/token'])
    }
  }

  handleTokenNextPage() {
    // handles the redirection to next page from token page
    if(this.currentPageAndState.state == '') {
      this.currentPageAndState.state = 'tokenSummary';
    } else {
      this.service.placedCards = this.localPlaced.map(ele => ele);  // storing placed cards with tokens added
      this.router.navigate(['end'])
    }
  }

  NavigateToHome() {
    this.service.discardedCards = this.service.discardedCards.filter(ele => ele != this.displayCardData.label);
    this.router.navigate(['/']);
  }
}
