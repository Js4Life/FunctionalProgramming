import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title: string;
 myHero: string;

  constructor() {
  this.title = 'Parent';
  this.myHero = 'Windstorm';
  }

  // childmessage: string = 'I am passed from Parent to child component';
}
