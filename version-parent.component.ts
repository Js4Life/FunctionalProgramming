import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'version-parent',
  template: `
  <h2>Source code version</h2>
  <button (click)="newMinor()">New Minor version</button>
  <button (click)="newMajor()">New major version</button>
  <version-child [major]="major" [minor]="minor"></version-child>
  `,
  styles: []
})
export class VersionParentComponent implements OnInit {
  major = 1;
  minor = 23;

  newMinor() {
    this.minor++;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
  }
  constructor() { }

  ngOnInit() {
  }

}
