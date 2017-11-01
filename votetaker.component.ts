import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vote-taker',
  template: `
<h2>Should mankind colonize the Universe</h2>
<h3>Agree : {{agreed}} , Disagree : {{disagreed}}</h3>
<my-voter *ngFor="let voter of voters" [name]="voter" (onVoted)="onVoted($event)"></my-voter>
  `,
  styles: []
})
export class VotetakerComponent implements OnInit {
agreed = 0;
disagreed = 0;
voters = ['Mriq', 'ms universe', 'bombasto'];

onVoted(agreed: boolean) {
  agreed ? this.agreed++ : this.disagreed++;
}
  constructor() { }

  ngOnInit() {
  }

}
