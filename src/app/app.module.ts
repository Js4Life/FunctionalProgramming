import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NoopInterceptor } from './noop.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:NoopInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
