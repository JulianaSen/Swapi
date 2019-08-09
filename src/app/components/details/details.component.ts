import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IPeople } from '../../../interfaces/people';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private routeSub: Subscription;
  people = [];
  person: string;
  films = [];
  userFilms = [];
  loading = true;

  constructor(private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.showPeople();
    this.routeSub = this.route.params.subscribe(params => {
      this.person = params.name;
    });
  }
  
  showPeople() {
    this._dataService.getPeople()
      .subscribe(data => {
        this.people = data.results;
        this.loading = false;
      });
  }

  showFilmsOfPerson(name: string) {
    this.people.map((item) => {
      if(item.name === name) {
        this.films = item.films;
        this.loading = false;
        for(let i = 0; i < this.films.length; i++) {
          this.userFilms = [... this.userFilms, this.showFilm(this.films[i])];
        }
      }
    });
  }

  showFilm (film: string) {
    this._dataService.getFilms(film)
      .subscribe((data) => { 
        return data;
      })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
