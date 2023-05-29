import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';

const routes: Routes = [
  { path: '', component: DiscussPageComponent },
  { 
    path: 'drag-and-drop',
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'rank', component: DragDropComponent },
      { path: 'token', component: DragDropComponent },
      { path: 'discardedCards', component: DragDropComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
