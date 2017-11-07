import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoaderService {
  loadingData: any;

  constructor() { }

  getMessages() {
    let observable = new Observable(observer => {
      console.log('Entering...');
      let socket = io(environment.ws_url);
      socket.on('news', data => {
         console.log(data);
         observer.next(data);
         this.loadingData = data;
         console.log('print response', this.loadingData);
        });
      });
    return observable;
  }
}
