import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PeopleComponent } from './components/people/people.component';
import { FilmsComponent } from './components/films/films.component';
import { DetailsComponent } from './components/details/details.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { PersonComponent } from './components/person/person.component';
import { FilmListComponent } from './components/film-list/film-list.component';

import { DataService } from '../services/data.service';
import { FilmService } from '../services/film.service';

import { SearchPipe } from '../app/pipes/search.pipe';

import { FilmState } from './states/films.state';
import { SwapiState } from './states/swapi.state';

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
    NgxsModule.forRoot([
      FilmState,
      SwapiState
    ]),
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
