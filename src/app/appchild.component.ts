import { Component, Input } from "@angular/core";

@Component({
    selector : 'appchild',
    template : `<h2>Hi {{greetMessage}}</h2>`
})

export class AppChildComponent {
    @Input() greetMessage : string;
    // greetMessage: string = "I am Child";
}