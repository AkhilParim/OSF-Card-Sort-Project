import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { SingleCardComponent } from './components/single-card/single-card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { EndPageComponent } from './components/end-page/end-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    CardCarouselComponent,
    SingleCardComponent,
    DiscussPageComponent,
    HomePageComponent,
    DialogBoxComponent,
    EndPageComponent
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
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
