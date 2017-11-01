import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
socket = null;
chatinp = '';
roomname = '';
constructor() {
  this.socket = io('http://localhost:3000');
  let listener = Observable.fromEvent(this.socket, 'message');
  listener.subscribe((payload) => {
    console.log(payload);
  } );
  // this.socket.on('message', (msg) => {
  //   console.log(msg);
  // });
}

send(msg) {
  if (this.roomname){
  this.socket.emit('message', msg);
  } else {
  alert('join a room first');
  }
}
joinroom(roomname) {
  let listener = Observable.fromEvent(this.socket, this.roomname);
  alert('connected' + this.roomname);
  listener.subscribe((payload) => {
    console.log('From' + this.roomname + '-' + payload );

});
}
}
