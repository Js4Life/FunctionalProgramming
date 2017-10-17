import { Component,ElementRef,QueryList,OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {SizerComponent} from './sizer.component';
import {ZoomComponent} from './zoom.component';
import {heroSwitchComponents} from './hero.switch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isActive = true;
 title: string;
 badCurly = 'bad curly';
 canSave;
 clickMessage = '';
 fontSizePx = 16;
//  myHero: string;
// heroes = ['windstorm','Bombasto','Magneta','Tornado'];
heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
isUnchanged = true;
isSpecial = true;
classes = 'special';
actionName = 'Go for it';

fontAnswer = 16;

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
saved() {alert('saved');}

currentClasses: {};

setCurrentClasses() {
  this.currentClasses = {
    'saveable': this.canSave,
    'modified' : !this.isUnchanged,
    'special': this.isSpecial 
  }
}

trackByHeroes(index:number,hero:Hero):number {
  return hero.id;
}

// callPhone(value:string) {
//   this.alert(this.alert(`caling ${value}`))
// }
callPhone(value: string) { this.alert(`Calling ${value} ...`); }
callFax(value:string) {this.alert(`calling ${value}....`);}



currentStyles: {};

setCurrentStyles() {
  this.currentStyles = {
    'font-style' : this.canSave ? 'italic' :'normal',
    'font-weight' : !this.isUnchanged ? 'bold' :'normal',
    'font-size' : this.isSpecial ? '24px' : '12px'
  }
}

trackById(index:number,item:any) {
  return item['id'];
}

setUppercaseName(name: string) {
  this.currentHero.name = name.toUpperCase();
}

  constructor() {
  this.title = 'Parent';
  this.currentHero = new Hero(1, 'hi') ;// Assign Hero Value
    // console.log(this.currentHero);

  // this.myHero = 'Windstorm';
  }
  ngOnInit() {
    this.setCurrentClasses();
    this.setCurrentStyles();
  }

  // childmessage: string = 'I am passed from Parent to child component';
}
