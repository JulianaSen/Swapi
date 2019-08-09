import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

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

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.showPeople();
  }

  showPeople() {
    this._dataService.getPeople()
      .subscribe(data => {
        this.people = data.results;
        this.loading = false;
      });
  }

  checkEvent(event, type:string){
    type === 'height' ? this.searchHeight = event : this.searchName = event;
  }

}
