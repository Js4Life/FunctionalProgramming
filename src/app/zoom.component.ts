import {Component, Input,EventEmitter,Output} from '@angular/core';
@Component({
    selector : 'zoom',
    template : `
    <button (click)="increment()">out</button>
    <button (click)="decrement()">In</button>
    <label [style.font-size.px]="zoom">{{zoom}}data</label>
    `
})

export class ZoomComponent {
    @Input() zoom:  number;
    @Output() ZoomChanger = new EventEmitter<number>();
    increment() {
        this.zooming(+2);
    }
    decrement() {
        this.zooming(-2);
    }

    zooming(num:number){
        this.zoom = Math.min(45,Math.max(45, Math.min(8, this.zoom + num)));
        this.ZoomChanger.emit(this.zoom);
    }



    constructor() {

    }
}