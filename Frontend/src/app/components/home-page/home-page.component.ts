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
  focusSlideWidth!: number;  // width of slide in focus
  slideWidth!: number;  // width of slides not in focus
  slides!: HTMLElement[];  // slides in the image carousel

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
    this.slides = Array.from(this.track.nativeElement.children as HTMLCollectionOf<HTMLElement>);
    this.slideWidth = this.slides[1].getBoundingClientRect().width + 30  ;
    let trackWidth = this.track.nativeElement.getBoundingClientRect().width;
    this.focusSlideWidth = trackWidth - (this.slideWidth * 2);
    this.slides[0].style.width = this.focusSlideWidth + 'px';
    this.slides.slice(1).forEach((slide, index) => {
      slide.style.left = this.focusSlideWidth + 30 + this.slideWidth * index + 'px';
    });
    Array.from(this.slides[0].getElementsByClassName('card-display') as HTMLCollectionOf<HTMLElement>)[0].style.display = 'flex';
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
    if(!discardCard) {
      this.service.discardedCards.splice(this.service.discardedCards.indexOf(cardLabel), 1);  // removing card from discarded card list
      return
    }
    this.service.discardedCards.push(cardLabel);  // adding card to discarded card list

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
      this.changeDisplaySlide(0, tempDiscardedCardIndex);
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

  changeDisplaySlide(arrow: number, goToIndex?: number) {
    if(goToIndex == undefined && (arrow == 1 && this.service.displayCardIndex == this.service.localCardsForHome.length - 1)
    || (arrow == -1 && this.service.displayCardIndex == 0)) {
      return
    } 

    let currentSlide = this.slides[this.service.displayCardIndex];
    let goToSlide = this.slides[goToIndex != undefined ? goToIndex : this.service.displayCardIndex + arrow];
    currentSlide.style.width = this.slideWidth - 30 + 'px';
    goToSlide.style.width = this.focusSlideWidth + 'px';
    if(goToIndex == undefined) {
      this.setSlidesPosition(this.service.displayCardIndex + arrow)
    } else {
      this.setSlidesPosition(goToIndex);
    }

    this.showHideCardContent(currentSlide, goToSlide)
    this.service.displayCardIndex = goToIndex != undefined ? goToIndex : this.service.displayCardIndex + arrow;
    
    // set the position of the track accordingly
    let amountToScroll = Number(this.slides[this.service.displayCardIndex].style.left.slice(0, -2)) - this.track.nativeElement.scrollLeft
    this.track.nativeElement.scrollBy({
      left: amountToScroll,
      behavior: "smooth",
    });
  }

  setSlidesPosition(goToIndex: number) {
    // changes the position of slides on the track accordingly
    if(goToIndex > this.service.displayCardIndex) {
      let defaultLeft = this.slideWidth * (this.service.displayCardIndex + 1);
      this.slides.slice(this.service.displayCardIndex + 1, goToIndex + 1).forEach((slide, ind) => {
        slide.style.left = defaultLeft + (this.slideWidth * ind) + 'px';
      });
    } else {
      let defaultLeft = (goToIndex * this.slideWidth) + this.focusSlideWidth + 30;
      this.slides.slice(goToIndex + 1, this.service.displayCardIndex + 1).forEach((slide, ind) => {
        slide.style.left = defaultLeft + (this.slideWidth * ind) + 'px';
      });
    }
  }

  showHideCardContent(currentSlide: HTMLElement, goToSlide: HTMLElement) {
    // show content of display card slide and hide other cards content
    Array.from(currentSlide.getElementsByClassName('card-display') as HTMLCollectionOf<HTMLElement>)[0].style.display = 'none';
    setTimeout(() => {
      Array.from(goToSlide.getElementsByClassName('card-display') as HTMLCollectionOf<HTMLElement>)[0].style.display = 'flex';
    }, 250);
  }
}
