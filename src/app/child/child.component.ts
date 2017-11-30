import { Component, OnInit , Input,Output,EventEmitter} from '@angular/core';
import {DataService} from '../data.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() message: any;
  childMessage: string = 'hala madrid';

  viewchildMsg: string = 'view child mssg printed';

  @Output() messageEmitter = new EventEmitter<string>();


  sendMessage() {
    this.messageEmitter.emit(this.childMessage);
  }
  constructor(private data:DataService){

  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.data.changeMessage('hello from sibling');
  }

}
