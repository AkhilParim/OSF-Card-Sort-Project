import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussPageComponent } from './components/discuss-page/discuss-page.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { EndPageComponent } from './components/end-page/end-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'discuss', component: DiscussPageComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
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
