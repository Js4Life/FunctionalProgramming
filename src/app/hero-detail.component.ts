import { Component, OnInit ,Input, EventEmitter,Output} from '@angular/core';
import {Hero} from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
//  @Input() hero: Hero = new Hero(1, 'zzzz');
@Input()  hero: Hero;
@Output() deleteRequest = new EventEmitter<Hero>();
  constructor() { }

  delete() {
    this.deleteRequest.emit(this.hero);
  }

  ngOnInit() {
  }

}
