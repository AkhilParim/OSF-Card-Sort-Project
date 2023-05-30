import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { EndPageComponent } from './components/end-page/end-page.component';

const routes: Routes = [
  { path: '', component: DiscussPageComponent },
  { 
    path: 'drag-and-drop',
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'rank', component: DragDropComponent },
      { path: 'token', component: DragDropComponent },
      { path: 'summary', component: DragDropComponent },
    ]
  },
  { path: 'end', component: EndPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
