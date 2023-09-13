import { HttpService } from './http.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'


import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { EndPageComponent } from './components/end-page/end-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

export function appInit(httpService: HttpService) {
  return (): Promise<any> => {
    return httpService.getCardsData();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DiscussPageComponent,
    HomePageComponent,
    DialogBoxComponent,
    DragDropComponent,
    DiscussPageComponent,
    HomePageComponent,
    DialogBoxComponent,
    EndPageComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    SwiperModule,
    DragDropModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: appInit,
      deps: [HttpService]
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
