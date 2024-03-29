import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPeople } from 'src/interfaces/people';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() people: IPeople; 
  @Input() person: string;

  constructor() { }

  ngOnInit() {
  }

}
