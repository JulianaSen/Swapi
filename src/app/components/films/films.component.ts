import { Component, OnInit, TemplateRef } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { setTheme } from 'ngx-bootstrap/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  modalRef: BsModalRef;
  form: FormGroup
  films = [];
  modalTitle: string;
  checked: boolean;
  loading = true;

  genres = [];
  ratings = [];

  type = "text";
  class = "form-control";
  placeholder = "Enter title to search";
  title = "title";
  searchTitle: string;
  
  public newFilm = {
    id: 0,
    title: "",
    author: "",
    rating: 0,
    genre: ""
  };
  
  constructor(private _filmService: FilmService, 
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { 
    setTheme('bs4');
    this.form = this.formBuilder.group({
      genre: [''],
      rating: ['']
    });
    this.genres = this.getGenre();
    this.ratings = this.getRating();
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

  getGenre() {
    return [
      { id: '1', name: 'comedy' },
      { id: '2', name: 'drama' },
      { id: '3', name: 'cartoon' },
      { id: '4', name: 'horror' }
    ];
  }

  getRating() {
    return [
      { id: '1', name: '1' },
      { id: '2', name: '2' },
      { id: '3', name: '3' },
      { id: '4', name: '4' },
      { id: '5', name: '5' }
    ];
  }

  checkEvent(event){
    this.searchTitle = event;
  }
}
