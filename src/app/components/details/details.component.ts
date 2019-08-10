import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private routeSub: Subscription;
  private dataS: Subscription;
  people = [];
  person: string;
  films = [];
  userFilms = [];
  test = [];
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
    this.people.map(item => {
      if(this.person === name && item.name === name) {
        this.films = item.films
      }
    })
    
    this.films.map(elem => {
      this.test = [...this.test, this.showFilm(elem)]
    })

    this.loading = false;
  }

  showFilm (url: string) {
    this.dataS = this._dataService.getFilms(url)
      .subscribe(data => { 
        this.userFilms.push(data);
        this.test = data;
      })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.dataS.unsubscribe();
  }

}
