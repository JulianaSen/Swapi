import { Component, OnInit, TemplateRef } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { setTheme } from 'ngx-bootstrap/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  modalRef: BsModalRef;

  public films = [];

  modalTitle: string;
  checked: boolean;
  loading = true;
  
  public newFilm = {
    id: 0,
    title: "",
    author: "",
    rating: 0,
    genre: ""
  };
  
  constructor(private _filmService: FilmService, private modalService: BsModalService) { 
    setTheme('bs4');
  }

  ngOnInit() {
    this.showFilms();
  }

  showFilms() {
    this._filmService.getFilms()
      .subscribe(data => {
        this.films = data;
        this.loading = false;
      });
  }

  deleteFilm(filmId) {
    return this._filmService.deleteFilm(filmId)
      .subscribe(() => {
        this.showFilms();
      });
  }

  createFilm() {
      this._filmService.addFilm(this.newFilm)
        .subscribe(() => {
          this.showFilms();
          //this.newFilm = null;
          this.modalRef.hide();
        });
  }
 
  editFilm(film) {
     this._filmService.updateFilm(film.id, this.newFilm)
        .subscribe(() => {
          this.showFilms();
          //this.newFilm = null;
          this.modalRef.hide();
        });
  }

  openModal(template: TemplateRef<any>, film, title) {
    this.modalTitle = title;
    this.modalRef = this.modalService.show(template);
    this.newFilm = film;
  }
}
