import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-second',
  template: `
  <p>Emits the value of a : {{a}} </p>
  <input type="text" [value]="a">
  <button (click)="emitter($event)">Add 3</button>
  `,
  styles: []
})
export class SecondComponent implements OnInit {
 @Input() a: any;
@Output() emitValue = new EventEmitter<any>();
  emitter() {
    this.a = this.a + 3;
    this.emitValue.emit(this.a);
  }

  constructor() { }

  ngOnInit() {
  }

}
