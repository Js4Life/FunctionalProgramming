import { Component, OnInit,  Output,Input, EventEmitter} from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {

  @Input() lists:any;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  tempList:any;
  searchText:string=null;
  constructor() { }


  search(value){
    this.tempList = _.filter(this.lists, function(obj)
    { 
      if(obj.name.toLowerCase().indexOf(value) >= 0)
      return obj;
    });
  }

  clear(){
    this.searchText=null;
    this.tempList=Object.assign([], this.lists);
  }

  ngOnInit() {
    if(this.lists)
      this.tempList=Object.assign([], this.lists);
    console.log(this.lists);
  }

}
