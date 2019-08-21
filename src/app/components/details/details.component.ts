import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription, pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { Store } from '@ngxs/store';
import { GetPeople, GetFilms } from 'src/app/actions/swapi.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  people = [];
  person: string;
  films = [];
  userFilms = [];
  loading = true;

  constructor(private _dataService: DataService, 
    private route: ActivatedRoute,
    private store: Store) { }

  ngOnInit() {
    //this.showPeople();
    this.store.dispatch(new GetPeople())
    .pipe(take(1))
    .subscribe(res => {
      if(res){
        this.people = res.swapi.people.results;
        this.loading = false;
        this.routeSub = this.route.params.subscribe(params => {
          this.person = params.name;
        });
        this.showFilmsOfPerson(this.person);
      }
    });
  }
  
  // showPeople() {
  //   this._dataService.getPeople()
  //     .subscribe(data => {
  //       this.people = data.results;
  //       this.loading = false;
  //       this.routeSub = this.route.params.subscribe(params => {
  //         this.person = params.name;
  //       });
  //       this.showFilmsOfPerson(this.person);
  //     });
  // }

  showFilmsOfPerson(name: string) {
    this.films = this.people.find(elem => elem.name === name).films;
    
    this.films.map(elem => {
      this.showFilm(elem);
    })

    this.loading = false;
  }

  showFilm (url: string) { 
    this.store.dispatch(new GetFilms(url))
    .pipe(take(1))
    .subscribe(res => {
      this.userFilms = [...this.userFilms, res.swapi.film];
    });
    // this._dataService.getFilms(url).pipe(take(1))
    //   .subscribe(data => { 
    //     this.userFilms = [...this.userFilms, data];
    //   })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
