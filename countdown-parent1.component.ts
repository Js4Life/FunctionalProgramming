import { Component, AfterViewInit ,ViewChild} from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component';

@Component({
  selector: 'app-countdown-parent1',
  template: `
    <p>
      countdown-parent1 Works! via view child
    </p>
    <button (click)="start()">Start</button>
    <button (click)="stop()">Stop</button>
    <div>{{seconds()}}</div>
    <countdown-timer></counter-timer>
  `,
  styles: []
})
export class CountdownParent1Component implements AfterViewInit {
  @ViewChild(CountdownTimerComponent)
  private timerComponent:CountdownTimerComponent;
  seconds() {
    return 0;
  }
  ngAfterViewInit() {
    setTimeout(() => this.seconds = () => this.timerComponent.seconds,0);
  }

  start(){
    this.timerComponent.start();
  }
  // start(){
  //   this.timerComponent.stop();
  // }

  constructor() { }

  ngOnInit() {
  }

}
