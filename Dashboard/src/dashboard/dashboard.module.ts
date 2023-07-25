import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { MostDiscardedComponent } from './components/most-discarded/most-discarded.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { MostImportantComponent } from './components/most-important/most-important.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TokensComponent,
    MostDiscardedComponent,
    MostImportantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
