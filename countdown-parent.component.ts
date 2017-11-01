import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-parent',
  template: `
<button (click)="timer.start()">Start</button>
<button (click)="timer.stop()">Stop</button>
<div>{{timer.seconds}}</div>
<countdown-timer #timer></countdown-timer>
  `,
  styles: ['demo.css']
})
export class CountdownParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
