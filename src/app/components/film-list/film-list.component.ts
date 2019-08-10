import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  @Input() userFilms: string[]; 

  random= [];

  constructor() { }

  ngOnInit() {
  }

  randomize(i) {
    while(this.random.length !== this.userFilms.length) {
      this.random = [...this.random, Math.floor(Math.random() * 10) + 1];
    }
    return(this.random[i]);
  }
  
}
