import { AppService } from './../../app.service';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ICardData } from 'src/app/app.model';

@Component({
  selector: 'app-discuss-page',
  templateUrl: './discuss-page.component.html',
  styleUrls: ['./discuss-page.component.scss']
})
export class DiscussPageComponent implements OnInit {
  off: any;
  _pointerPosition: any;
  displayCardData!: ICardData;
  
  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;
  
  constructor(private router: Router, public service: AppService) { }

  ngOnInit(): void {
    this.displayCardData = this.service.cardsData[this.service.localCardsForHome[this.service.displayCardIndex]];
  }
  
  cardMoveListener(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  placeCard(event: CdkDragDrop<ICardData>) {
    // handles event when card is dropped on the Card button
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - rectZone.top;
    let x = this._pointerPosition.x - rectZone.left;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
        this.router.navigate(['/drag-and-drop/rank']);
    }
  }
}
