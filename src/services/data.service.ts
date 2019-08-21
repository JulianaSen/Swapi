import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film, IPeople } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _urlPeople:string = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  getPeople() {
    return this.http.get<IPeople[]>(this._urlPeople);
  }

  getFilms(url: string) {
    return this.http.get<Film[]>(url);
  }
}
