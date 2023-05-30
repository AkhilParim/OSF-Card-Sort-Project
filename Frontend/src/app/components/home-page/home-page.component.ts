import { CdkDragMove, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

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

  constructor(public service: AppService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  onLongPressDiscard(card: any, event: any): void {
    if(!this.service.discardedCards.includes(card.label)) {
      this.service.discardedCards.push(card.label);
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
        this.service.displayCard = event.item.data.label;
        this.service.discardedCards = this.service.discardedCards.filter(ele => ele != event.item.data);
        this.router.navigate(['/discuss']);   
    }
  }

}
