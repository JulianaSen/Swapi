import { Component, OnInit, TemplateRef } from '@angular/core';
import { FilmService } from '../../../services/film.service';
import { setTheme } from 'ngx-bootstrap/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { DeleteFilm, GetFilms, SetSelectedFilm, AddFilm, UpdateFilm } from '../../actions/films.actions';
import { FilmState } from '../../states/films.state';
import { IFilm } from '../../../interfaces/films';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  modalRef: BsModalRef;
  modalTitle: string;
  checked: boolean;
  loading = true;
  
  //films = [];
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
  
  form = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: ['', Validators.required],
    rating: ['', Validators.required]
  });

  constructor(private _filmService: FilmService, 
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private store: Store) { 
      setTheme('bs4');
      this.genres = this.getGenre();
      this.ratings = this.getRating();
  }

  @Select(FilmState.getFilmList) films: Observable<IFilm[]>;

  ngOnInit() {
    //this.showFilms();
    this.store.dispatch(new GetFilms())
    .pipe(take(1))
    .subscribe(res => {
      if(res){
        this.loading = false;
      }
    });
  }

  deleteFilm(id: number) {
    this.store.dispatch(new DeleteFilm(id));
  }

  updateFilm(payload: IFilm) {
    this.store.dispatch(new UpdateFilm(payload))
    //this.store.dispatch(new SetSelectedFilm(payload))
    .pipe(take(1))
    .subscribe(() => {
      this.modalRef.hide();
      this.store.dispatch(new GetFilms());
    });    
  }

  createFilm() {
    this.store.dispatch(new AddFilm(this.newFilm))
    .pipe(take(1))
    .subscribe(() => {
      this.modalRef.hide();
      this.form.reset();
    });
  }

  // showFilms() {
  //   this._filmService.getFilms()
  //     .subscribe(data => {
  //       this.films = data;
  //       this.loading = false;
  //     });
  // }

  // deleteFilm(filmId) {
  //   return this._filmService.deleteFilm(filmId)
  //     .subscribe(() => {
  //       this.showFilms();
  //     });
  // }

  // createFilm() {
  //     this._filmService.addFilm(this.newFilm)
  //       .subscribe(() => {
  //         this.showFilms();
  //         this.modalRef.hide();
  //         this.form.reset();
  //       });
  // }
 
  // editFilm(film) {
  //    this._filmService.updateFilm(film.id, this.newFilm)
  //       .subscribe(() => {
  //         this.showFilms();
  //         this.modalRef.hide();
  //       });
  // }

  openModal(template: TemplateRef<any>, film, title) {
    this.modalTitle = title;
    this.modalRef = this.modalService.show(template, {keyboard: false,backdrop: 'static'});
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
