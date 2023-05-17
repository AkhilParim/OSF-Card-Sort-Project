import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDragMove,
  moveItemInArray,
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

  @ViewChild('dropZone', { read: ElementRef, static: true }) dropZone!: ElementRef;

  ngOnInit(): void {
    this.todo = [
      { label: 'Get to work', x: 0, y: 0, 'z-index': 0 },
      { label: 'Pick up groceries', x: 0, y: 0, 'z-index': 0 },
      { label: 'Go home', x: 0, y: 0, 'z-index': 0 },
      { label: 'Fall asleep', x: 0, y: 0, 'z-index': 0 },
      { label: 'Get up', x: 0, y: 0, 'z-index': 0 },
      { label: 'Brush teeth', x: 0, y: 0, 'z-index': 0 },
      { label: 'Take a shower', x: 0, y: 0, 'z-index': 0 },
      { label: 'Check e-mail', x: 0, y: 0, 'z-index': 0 },
      { label: 'Walk dog', x: 0, y: 0, 'z-index': 0 },
    ];
  }

  drop(event: CdkDragDrop<any[]>) {  
    // handles event when card is dropped
    if (event.previousContainer === event.container) {
      return;
    }
    let y = this._pointerPosition.y -
      this.off.y - this.dropZone.nativeElement.getBoundingClientRect().top;

    let x = this._pointerPosition.x -
      this.off.x - this.dropZone.nativeElement.getBoundingClientRect().left;

    if (this.checkIfItemInBounds(x, y, event)) {
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

  moved(event: CdkDragMove<any>) {
    this._pointerPosition = event.pointerPosition;
  }

  changeZIndex(item: any) {
    this.done.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
  }

  changePosition(event: CdkDragDrop<any>, field: any) {
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
