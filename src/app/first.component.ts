import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-first',
  template: `
<p> value of a : {{passValue}}</p><button (click)="decrement()">dec</button>
  `,
  styles: []
})
export class FirstComponent implements OnInit {

  @Input() passValue: any;
  constructor() { }

  decrement() {
    this.passValue--;
  }

  ngOnInit() {
  }

}
