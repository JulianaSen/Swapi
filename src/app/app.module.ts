import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PeopleComponent } from './components/people/people.component';
import { FilmsComponent } from './components/films/films.component';

import { DataService } from '../services/data.service';
import { FilmService } from '../services/film.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SearchPipe } from '../app/pipes/search.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailsComponent } from './components/details/details.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { PersonComponent } from './components/person/person.component';
import { FilmListComponent } from './components/film-list/film-list.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    SearchPipe,
    FilmsComponent,
    DetailsComponent,
    InputComponent,
    TableComponent,
    PersonComponent,
    FilmListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
