import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscardedCardsComponent } from './components/discarded-cards/discarded-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { LongPressDiscardDirective } from './long-press-discard.directive';

@NgModule({
  declarations: [
    AppComponent,
    DiscardedCardsComponent,
    DiscussPageComponent,
    HomePageComponent,
    DialogBoxComponent,
    LongPressDiscardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    SwiperModule,
    DragDropModule,
    MatDialogModule
  ],
  exports: [LongPressDiscardDirective],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
