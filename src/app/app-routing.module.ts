import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './components/people/people.component';
import { FilmsComponent } from './components/films/films.component';
import  { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path: '', component: PeopleComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'details/:name', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
