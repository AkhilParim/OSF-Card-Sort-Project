import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
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
    state: ''  // statesOfSummaryPage = '' or 'discardedCards' or 'reposition',     statesOfTokensPage = '' or 'tokenSummary'
  };
  isLastCard: Boolean = this.service.placedCards.length + this.service.discardedCards.length + 1 >= Object.keys(this.service.cardsData).length;

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;
  @ViewChildren('removeTokensZone') removeTokensZone!: QueryList<ElementRef>;

  constructor(public service: AppService, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.currentPageAndState.page = String(this.router.url.split('/').slice(-1)) as PageTypes;
    if(this.currentPageAndState.page == 'rank') {
      this.displayCardData = this.service.cardsData[this.service.localCardsForHome[this.service.displayCardIndex]];  
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
      let coordinates: IPlacedCard = { 'label': event.item.data, 'x': x, 'y': y, 'zIndex': 0, tokens: new Set() }
      if(this.currentPageAndState.page == 'summary') {
        this.localDiscardedCards = this.localDiscardedCards.filter(card => card != String(event.item.data));
        this.currentPageAndState.state = '';
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
    this.localPlaced.forEach((x) => (x['zIndex'] = x == item ? 1 : 0));
  }

  changePosition(event: CdkDragDrop<any>, field: IPlacedCard) {
    // handles the change of position of a card within the drop zone
    let y = field.y + event.distance.y;
    let x = field.x + event.distance.x;
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement = event.item.element.nativeElement.getBoundingClientRect();

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
    // do not remove 0.1
    field.x = x + 0.1;
    field.y = y + 0.1;
    
    this.localPlaced = this.localPlaced.sort((a, b) =>
      a['zIndex'] > b['zIndex'] ? 1 : a['zIndex'] < b['zIndex'] ? -1 : 0
    );
  }

  tokenDragStart(event: CdkDragStart<any>, idx: number) {
    let children = Array.from(this.dropZone.nativeElement.children[idx].getElementsByClassName('item-token') as HTMLCollectionOf<HTMLElement>);
    children.forEach(element => {
      element.style.display = 'none';
    });
  }

  removeTokens(event: CdkDragDrop<any>, field: IPlacedCard, idx: number) {
    // do not remove 0.1
    field.x = field.x + 0.1;
    field.y = field.y + 0.1;
    
    const rectZone = this.removeTokensZone.first.nativeElement.getBoundingClientRect();
    let x = this._pointerPosition.x - this.off.x - rectZone.left;
    let y = this._pointerPosition.y - this.off.y - rectZone.top;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
        this.localPlaced[idx].tokens = new Set();
    }
    let children = Array.from(this.dropZone.nativeElement.children[idx].getElementsByClassName('item-token') as HTMLCollectionOf<HTMLElement>);
    children.forEach(element => {
      element.style.display = 'block';
    });
  }

  fixRankCardPosition() {
    if(!this.isLastCard) {
      this.service.placedCards = this.localPlaced.map(ele => ele);  // storing new placed cards
      this.service.localCardsForHome = this.service.localCardsForHome.filter(ele => ele != this.displayCardData.label);
      this.router.navigate(['/']);
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    this.service.disableRotatingBorder(true);
    let dialogRef = this.dialog.open(DialogBoxComponent, { data: this.currentPageAndState.page == 'token' ? 'tokens' : 'cards' });
    dialogRef.afterClosed().subscribe(result => {
      this.service.disableRotatingBorder(false);
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

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
