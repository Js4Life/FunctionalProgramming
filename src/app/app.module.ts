import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppChildComponent } from "./appchild.component";
import { HeroDetailComponent } from './hero-detail.component';
import {ClickDirective} from './click.directive';
import {SizerComponent} from './sizer.component';
import {ZoomComponent} from './zoom.component'
import {FormsModule} from '@angular/forms';
import {heroSwitchComponents} from './hero.switch.component';
import {HeroFormComponent} from './hero-form.component';
@NgModule({
  declarations: [
    AppComponent,
    AppChildComponent,
    HeroDetailComponent,
    ClickDirective,
    SizerComponent,
    ZoomComponent,
    heroSwitchComponents,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
