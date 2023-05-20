import { AppService } from './../../app.service';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discuss-page',
  templateUrl: './discuss-page.component.html',
  styleUrls: ['./discuss-page.component.scss']
})
export class DiscussPageComponent {
  off: any;
  _pointerPosition: any;
  
  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;
  
  constructor(private router: Router, public service: AppService) { }
  
  moved(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  placeCard(event: CdkDragDrop<any[]>) {
    // handles event when card is dropped on the Card button
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    let y = this._pointerPosition.y - rectZone.top;
    let x = this._pointerPosition.x - rectZone.left;
    
    if(!(y < 0 ||
      x < 0 ||
      y > rectZone.height ||
      x > rectZone.width)) {
        const queryStringPairs = '/drag-and-drop?rank=true';
        this.router.navigateByUrl(queryStringPairs);
    }
  }
}
