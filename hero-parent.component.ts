import { Component, OnInit } from '@angular/core';
import {HEROES} from './hero'
@Component({
  selector: 'hero-parent',
  templateUrl: './hero-parent.component.html',
  styleUrls: ['./hero-parent.component.css']
})
export class HeroParentComponent implements OnInit {
    heroes = HEROES;
    master = 'Master';
  constructor() { }

  ngOnInit() {
  }

}
