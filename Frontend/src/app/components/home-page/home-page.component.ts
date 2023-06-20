import { CdkDragMove, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit, AfterViewInit {
  off: any;
  _pointerPosition: any;
  slideWidth!: number;
  focusEleWidth!: number;

  @Input() appLongPressDiscard: any ; 

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;
  @ViewChild('carouselTrack', { read: ElementRef, static: true }) track!: ElementRef;

  constructor(public service: AppService, private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    if(this.service.displayCardIndex >= this.service.localCardsForHome.length) {
      this.service.displayCardIndex = this.service.localCardsForHome.length - 1;
    }    
  }
    
  ngAfterViewInit(): void {
    let slides = Array.from(this.track.nativeElement.children as HTMLCollectionOf<HTMLElement>);
    this.slideWidth = slides[0].getBoundingClientRect().width + 30  ;
    let trackWidth = this.track.nativeElement.getBoundingClientRect().width;
    this.focusEleWidth = trackWidth - (this.slideWidth * 2);
    slides[0].style.width = this.focusEleWidth + 'px';
    Array.from(slides).slice(1).forEach((slide, index) => {
      slide.style.left = this.focusEleWidth + 30 + this.slideWidth * index + 'px';
    });
  }

  cardMoveListener(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  placeCard(event: CdkDragDrop<any>) {
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - rectZone.top;
    let x = this._pointerPosition.x - rectZone.left;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
        this.router.navigate(['/discuss']);   
    }
  }

  toggleDiscardCard(discardCard: Boolean) {
    let cardLabel = this.service.localCardsForHome[this.service.displayCardIndex];
    if(discardCard) {   // adding card to discarded card list
      this.service.discardedCards.push(cardLabel);
    } else {  // removing card from discarded card list
      this.service.discardedCards.splice(this.service.discardedCards.indexOf(cardLabel), 1);
    }

    if(this.service.localCardsForHome.length == this.service.discardedCards.length) {
      // if all cards are discarded, then ask confirmation to go to summary page
      this.openDialog();
    } else {
      // going to the next non-discarded card
      let tempDiscardedCardIndex = this.service.displayCardIndex < this.service.localCardsForHome.length - 1 ? this.service.displayCardIndex : 0;
      while(this.service.discardedCards.includes(this.service.localCardsForHome[tempDiscardedCardIndex])) {
        tempDiscardedCardIndex += 1
        if(tempDiscardedCardIndex == this.service.localCardsForHome.length) { tempDiscardedCardIndex = 0 }
      }
      this.service.displayCardIndex = tempDiscardedCardIndex;
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogBoxComponent, { data: 'cards' });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true') {
        this.router.navigate(['drag-and-drop/summary'])
      }
    });
  }

  changeDisplaySlide(arrow: number) {
    if((arrow == 1 && this.service.displayCardIndex == this.service.localCardsForHome.length - 1)
    || (arrow == -1 && this.service.displayCardIndex == 0)) {
      return
    } 
    let slides = Array.from(this.track.nativeElement.children as HTMLCollectionOf<HTMLElement>);
    let currentSlide = slides[this.service.displayCardIndex];
    let goToSlide = slides[this.service.displayCardIndex + arrow];
    if(arrow == 1) {
      currentSlide.style.width = this.slideWidth - 30 + 'px';
      goToSlide.style.width = this.focusEleWidth + 'px';
      goToSlide.style.left = (this.slideWidth * (this.service.displayCardIndex + 1)) + 'px';
      // goToSlide.querySelector('.card-content').style.display = 'block';
    } else {
      goToSlide.style.width = this.focusEleWidth + 'px';
      currentSlide.style.width = this.slideWidth - 30 + 'px';
      currentSlide.style.left = this.focusEleWidth + (this.slideWidth * (this.service.displayCardIndex - 1)) + 30 + 'px';
    }
    this.service.displayCardIndex += arrow;
    let amountToScroll = arrow == 1 ? this.slideWidth : -this.slideWidth
    this.track.nativeElement.scrollBy({
      left: amountToScroll,
      behavior: "smooth",
    });
  }
}
