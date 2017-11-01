import { Component } from '@angular/core';
import { PushNotificationComponent } from 'ng2-notifications/ng2-notifications';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
}
// import { Component } from '@angular/core';
// import { PushNotificationComponent } from 'ng2-notifications/ng2-notifications';
// import { NativeNotificationService } from 'angular-notice/lib/native-notification.service';

// @Component({
//  selector: 'app-root',
//  template: `
//  <p>{{title}}</p>
//  <header>
//  <h1 class="title">{{ title }}</h1>
// </header>
// <main>
//  <h2>{{ description }}</h2>
//  <img src="../assets/demo.gif">
//  <button (click)="notify()">Show Notification</button>
// </main>
//  <push-notification 
//  title="ng2-notifications"
//  body="Component for Native Push Notifications"
//  icon="https://goo.gl/3eqeiE">
// </push-notification>
//  `,
 
// })

// export class AppComponent {
//   title ='Notification';
//   constructor(private _service: NativeNotificationService){}
//   someMethodThatGetsCalledWithinComponent(){
//     const options =  { 
//                         title: 'hello world',
//                         body : 'this is a notification body',
//                         dir: 'ltr',
//                         icon: '../assets/ng-shield.png',
//                         tag: 'notice',
//                         closeDelay: 2000
//                     };
//     this._service.notify(options);
// }
// }
