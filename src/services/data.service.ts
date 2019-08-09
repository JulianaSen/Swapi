import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPeople, Film, Response } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _urlPeople:string = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Response> {
    return this.http.get<Response>(this._urlPeople);
  }

  getFilms(url: string): Observable<Film[]> {
    return this.http.get<Film[]>(url);
  }
}
