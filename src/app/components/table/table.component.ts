import { Component, OnInit, Input } from '@angular/core';
import { IPeople } from 'src/interfaces/people';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() people: IPeople; 
  @Input() name: string;
  @Input() height: string;
  @Input() searchN: string;
  @Input() searchH: string;

  constructor() { }

  ngOnInit() {
  }

}
