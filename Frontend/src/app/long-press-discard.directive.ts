import { Directive, EventEmitter, HostListener, Output  } from '@angular/core';

@Directive({
  selector: '[appLongPressDiscard]'
})
export class LongPressDiscardDirective {

  @Output() appLongPressDiscard: EventEmitter<void> = new EventEmitter<void>();
  private timeoutId: any;
  private longPressActive = false;

  @HostListener('mousedown') onMouseDown(): void {
    console.log('mousedown - The long press event was fired!');
    this.longPressActive = false;
    this.timeoutId = setTimeout(() => {
      this.appLongPressDiscard.emit();
      this.longPressActive = true;  
    }, 500); // Adjust the duration as needed (e.g., 1000ms for a 1-second long press)  
  }

  @HostListener('touchstart') onTouchStart(): void {

    console.log('touchstart - The long press event was fired!');
    this.longPressActive = false;
    this.timeoutId = setTimeout(() => {
      // this.appLongPressDiscard.emit();
      this.longPressActive = true;  
    }, 500);
  
  }

  @HostListener('mouseup') onMouseUp(): void {
    console.log('mouseup - The long press event was fired!');
    clearTimeout(this.timeoutId);
    console.log(this.longPressActive);
    if(this.longPressActive) {
      this.longPressActive = false;
      this.appLongPressDiscard.emit();
      // style the disable card
      // console.log('The long press event was fired!');
    }
    clearTimeout(this.timeoutId);
  }

  @HostListener('touchend') onTouchEnd(): void {
    console.log('touchend - The long press event was fired!');
    clearTimeout(this.timeoutId);
    console.log(this.longPressActive);
    if(this.longPressActive) {
      this.longPressActive = false;
      this.appLongPressDiscard.emit();
      // style the disable card
      // console.log('The long press event was fired!');
    }
    clearTimeout(this.timeoutId);
  }

  // @HostListener('mouseleave') onMouseLeave(): void {
  //   clearTimeout(this.timeoutId);
  // }

  constructor() { }

}
