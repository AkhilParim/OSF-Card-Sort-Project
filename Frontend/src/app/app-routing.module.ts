import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { DiscardedCardsComponent } from './components/discarded-cards/discarded-cards.component';

const routes: Routes = [
  { path: '', component: DiscussPageComponent },
  { path: 'drag-and-drop', component: DiscardedCardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
