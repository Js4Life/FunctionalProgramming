import { Component, OnInit, Input ,OnChanges} from '@angular/core';
import {environment} from '../../environments/environment'
import * as io from 'socket.io-client';
import {Subject} from 'rxjs/Subject';
 import {Observable} from 'rxjs/Observable';
 import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit  {
@Input() loadingData:any;

messages = [];
connection;
message;
dataa;
public widthValue:any;


constructor(private LoadService: LoaderService){

}

ngOnInit() {
  this.connection = this.LoadService.getMessages().subscribe(message => {
    this.messages.push(message);
    this.dataa = this.messages[this.messages.length - 1];
    console.log('array messages', this.messages);
    // this.widthValue = message;
  })
}

}