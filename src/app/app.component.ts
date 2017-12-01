import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  a: any = 3;
  passValue: any;

  @Output() change = new EventEmitter<any>();

  emitter(e) {
    console.log(e);
    this.passValue = e;
    this.change.emit(this.passValue);
  }
}
