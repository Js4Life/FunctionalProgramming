import {Directive,EventEmitter, Output, ElementRef} from '@angular/core';

// @Directive({
//     selector:'[myClick]'
// })

@Directive({
    selector: '[myClick2]',
    outputs: ['clicks:myClick']  // propertyName:alias
  })
  export class ClickDirective {
    clicks = new EventEmitter<string>();
    toggle = false;
  
    constructor(el: ElementRef) {
      el.nativeElement
        .addEventListener('click', (event: Event) => {
          this.toggle = !this.toggle;
          this.clicks.emit(this.toggle ? 'Click2!' : '');
        });
    }
  }