import { CdkDragMove, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent {
  off: any;
  _pointerPosition: any;

  @Input() appLongPressDiscard: any ; 

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;

  constructor(public service: AppService, private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    if(this.service.displayCardIndex >= this.service.localCardsForHome.length) {
      this.service.displayCardIndex = this.service.localCardsForHome.length - 1;
    }
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

  changeDisplayImage(change: number) {
    let changedIndex = this.service.displayCardIndex + change
    if(changedIndex >= this.service.localCardsForHome.length || changedIndex < 0) {
      return
    }
    this.service.displayCardIndex = changedIndex;
  }

  toggleDiscardCard() {
    let indexOfEle = this.service.discardedCards.indexOf(this.service.localCardsForHome[this.service.displayCardIndex]);
    if(this.service.discardedCards.indexOf(this.service.localCardsForHome[this.service.displayCardIndex]) >= 0) {
      this.service.discardedCards.splice(indexOfEle, 1);
    } else {
      this.service.discardedCards.push(this.service.localCardsForHome[this.service.displayCardIndex]);
    }

    if(this.service.localCardsForHome.length == this.service.discardedCards.length) {
      this.openDialog();
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

}
