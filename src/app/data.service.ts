import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService implements OnInit {
    private messageSource = new BehaviorSubject<string>('default message');
    currentMessage = this.messageSource.asObservable();

    constructor() {}
    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    ngOnInit() {
    }

}
