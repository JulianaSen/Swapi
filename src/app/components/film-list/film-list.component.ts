import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  @Input() userFilms: string[]; 

  random= [];
  src: string;
  title: string;

  constructor() { }

  ngOnInit() {
  }

  changeImage(film, src) {
    this.userFilms.map((item) => {
      if(film === item['title']) {
        this.title = item['title'];
        this.src = src;
      }
    });
  }

  randomize(i) {
    while(this.random.length !== this.userFilms.length) {
      this.random = [...this.random, Math.floor(Math.random() * 10) + 1];
    }
    return(this.random[i]);
  }
  
}
