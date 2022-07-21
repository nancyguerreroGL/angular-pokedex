import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScrollDirective  implements AfterViewInit{
  scrollEvent$: any

  constructor(private element: ElementRef) { 
      console.log('element', this.element)
  }

  ngAfterViewInit(){
    this.registerScrollEvent()
  }

  private registerScrollEvent() {

    this.scrollEvent$ = fromEvent(this.element.nativeElement, 'scroll').subscribe((scroll)=> {
      console.log('scroll', scroll)
    });

  }

}
