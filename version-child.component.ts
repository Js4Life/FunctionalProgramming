import { Component, OnInit ,OnChanges,SimpleChange,Input} from '@angular/core';

@Component({
  selector: 'version-child',
  template: `<h3>Version {{major}}.{{minor}}</h3>
  <h4>change Log</h4>
  <ul>
  <li *ngFor="let change of changeLog">{{change}}</li>
  </ul>
  `,
  styles: []
})
export class VersionChildComponent implements OnInit {
  @Input() major:number;
  @Input() minor:number;
  changeLog: string[] = [];

ngOnChanges(changes:{[propKey:string]:SimpleChange}){
  let log : string[] =[];
  for (let propName in changes) {
    let changedProp = changes[propName];
    let to =JSON.stringify(changedProp.currentValue);
    if(changedProp.isFirstChange()){
    log.push(`Initial value of ${propName} set to ${to}`);
    }else {
      let from = JSON.stringify(changedProp.previousValue);
      log.push(`${propName} changed from ${from} to ${to}`);
    }
  }
  this.changeLog.push(log.join(','));
}


  constructor() { }

  ngOnInit() {
  }

}
