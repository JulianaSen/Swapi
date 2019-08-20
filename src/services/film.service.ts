import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFilm } from '../interfaces/films';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private _urlFilms:string = "http://localhost:3000/films";
  
  constructor(private http: HttpClient) { }

  // getFilms(): Observable<IFilm[]> {
  //   return this.http.get<IFilm[]>(this._urlFilms);
  // }

  // deleteFilm(film_id): Observable<{}> {
  //   return this.http.delete(this._urlFilms + '/' + film_id);
  // }

  // addFilm(film: IFilm): Observable<IFilm> {
  //   return this.http.post<IFilm>(this._urlFilms, JSON.stringify(film), httpOptions);
  // }

  // updateFilm(film_id, film: IFilm) {
  //   return this.http.put(this._urlFilms + '/' + film_id, film);
  // }

  getFilms() {
      return this.http.get<IFilm[]>(this._urlFilms);
  }

  deleteFilm(id: number) {
      return this.http.delete(this._urlFilms + '/' + id);
  }

  addFilm(payload: IFilm) {
      return this.http.post<IFilm>(this._urlFilms, JSON.stringify(payload), httpOptions);
  }

  updateFilm(payload: IFilm) {
      return this.http.put<IFilm>(this._urlFilms + '/' + payload.id, payload);
  }
}
