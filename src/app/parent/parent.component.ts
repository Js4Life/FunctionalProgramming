import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {ChildComponent} from '../child/child.component';
import {DataService} from '../data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit,OnInit {

  @ViewChild(ChildComponent) child;
  newmsssg: any= 'changes';
  messages = 'this data is coming from parent to child';

  message: any;

  ngAfterViewInit() {
    // this.newmsssg = this.child.viewchildMsg;
  }

  receiveMessage($event) {
    this.messages = $event;
    console.log('emitted data : ' , this.messages);
  }
  constructor(private data:DataService){
    
      }
    
      ngOnInit() {
        this.data.currentMessage.subscribe(message => this.message = message);
      }

}
