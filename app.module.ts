import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroChildComponent } from './hero-child.component';
import { HeroParentComponent } from './hero-parent.component';
import { NameChildComponent } from './name-child.component';
import { NameParentComponent } from './name-parent.component';
import { VersionChildComponent } from './version-child.component';
import { VersionParentComponent } from './version-parent.component';
import { VoterComponent } from './voter.component';
import { VotetakerComponent } from './votetaker.component';
import { PushNotificationComponent } from 'ng2-notifications/ng2-notifications';
import { NotificationsModule } from 'angular-notice';
import { CountdownTimerComponent } from './countdown-timer.component';
import { CountdownParentComponent } from './countdown-parent.component';
import { CountdownParent1Component } from './countdown-parent1.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroChildComponent,
    HeroParentComponent,
    NameChildComponent,
    NameParentComponent,
    VersionChildComponent,
    VersionParentComponent,
    VoterComponent,
    VotetakerComponent,
    PushNotificationComponent,
    CountdownTimerComponent,
    CountdownParentComponent,
    CountdownParent1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [NotificationsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
