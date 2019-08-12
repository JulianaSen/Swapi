import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription, pipe } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'

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

  constructor(private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.showPeople();
    
  }
  
  showPeople() {
    this._dataService.getPeople()
      .subscribe(data => {
        this.people = data.results;
        this.loading = false;
        this.routeSub = this.route.params.subscribe(params => {
          this.person = params.name;
        });
        this.showFilmsOfPerson(this.person);
      });
  }

  showFilmsOfPerson(name: string) {
    this.films = this.people.find(elem => elem.name === name).films;
    
    this.films.map(elem => {
      this.showFilm(elem);
    })

    this.loading = false;
  }

  showFilm (url: string) { 
    this._dataService.getFilms(url).pipe(take(1))
      .subscribe(data => { 
        this.userFilms = [...this.userFilms, data];
      })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
