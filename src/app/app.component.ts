import { Component } from '@angular/core';
import {Hero} from './hero';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title: string;
//  myHero: string;
// heroes = ['windstorm','Bombasto','Magneta','Tornado'];
heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
isUnchanged = true;


// using hero.ts
heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(2, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];
 myHero = this.heroes[0];
 
currentHero: Hero; // Hero Type

getVal() {
  return 2;
}
alert(msg?: string) {window.alert(msg); }
deleteHero(hero: Hero) {
  console.log(hero);
  this.alert(`Delete ${hero ? hero.name : 'the hero'}.`);
}

onSave(event: KeyboardEvent) {
    let evtMsg = event ? 'Event target is ' + (<HTMLElement>event.target).textContent : '';
    this.alert('Saved.' + evtMsg);
    if (event) {
      event.stopPropagation();
    }
}

onSubmit() {}


  constructor() {
  this.title = 'Parent';
  this.currentHero = this.heroes[0];  // Assign Hero Value



  // this.myHero = 'Windstorm';
  }

  // childmessage: string = 'I am passed from Parent to child component';
}
