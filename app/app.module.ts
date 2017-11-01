import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MediaItemComponent } from './media-item.component';
import { MediaItemListComponent } from './media-item-list.component';
import {FavoriteDirective } from './favorite.directive';
import {CategoryListPipe} from './category-list.pipe';
import { MediaItemFormComponent } from './media-item-form.component';
import {MediaItemService} from './media-item.service';
import {lookupLists, lookupListToken} from './providers';
import {HttpModule, XHRBackend} from '@angular/http';
import {MockXHRBackend} from './mock-xhr-backend';
import {routing} from './app.routing';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        MediaItemComponent,
        MediaItemListComponent,
        FavoriteDirective,
        CategoryListPipe,
        MediaItemFormComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        MediaItemService,
        {provide: lookupListToken, useValue: lookupLists},
        {provide: XHRBackend, useClass: MockXHRBackend}
    ]
})
export class AppModule { }