import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Store, Select } from '@ngxs/store';
import { GetPeople } from 'src/app/actions/swapi.actions';
import { take } from 'rxjs/operators';
import { SwapiState } from 'src/app/states/swapi.state';
import { Observable } from 'rxjs';
import { IPeople } from 'src/interfaces/people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public people = [];
  loading = true;
  type = "text";
  class = "form-control";
  placeholder1 = "Enter name to search";
  placeholder2 = "Enter height to search";

  height = "height";
  name = "name";

  searchHeight: number;
  searchName: string;

  constructor(private _dataService: DataService,
    private store: Store) { }


  ngOnInit() {
    //this.showPeople();
    this.store.dispatch(new GetPeople())
    .pipe(take(1))
    .subscribe(res => {
      if(res){
        this.people = res.swapi.people.results;
        this.loading = false;
      }
    });
  }

  // showPeople() {
  //   this._dataService.getPeople()
  //     .subscribe(data => {
  //       this.people = data.results;
  //       this.loading = false;
  //     });
  // }

  checkEvent(event, type:string){
    type === 'height' ? this.searchHeight = event : this.searchName = event;
  }

}
