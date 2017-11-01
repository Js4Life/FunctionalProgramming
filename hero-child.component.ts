import { Component, OnInit,Input } from '@angular/core';
import {Hero} from './hero';
@Component({
  selector: 'hero-child',
  templateUrl: './hero-child.component.html',
  styleUrls: ['./hero-child.component.css']
})
export class HeroChildComponent implements OnInit {
  @Input() hero:Hero;
  @Input('master') masterName: string;
  constructor() { }

  ngOnInit() {
  }

}
