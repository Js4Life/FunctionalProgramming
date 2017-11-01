import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'name-parent',
  templateUrl: './name-parent.component.html',
  styleUrls: ['./name-parent.component.css']
})
export class NameParentComponent implements OnInit {

  names = ['Mr.IQ','','bombasto']
  constructor() { }

  ngOnInit() {
  }

}
