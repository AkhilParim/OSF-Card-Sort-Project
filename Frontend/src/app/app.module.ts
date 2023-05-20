import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscardedCardsComponent } from './components/discarded-cards/discarded-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SingleCardComponent } from './components/single-card/single-card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DiscussScreenComponent } from './components/discuss-screen/discuss-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscardedCardsComponent,
    CardCarouselComponent,
    SingleCardComponent,
    DiscussScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    SwiperModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
