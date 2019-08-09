import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() type: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() model: string;

  @Output() searchType = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  search(t: string) {
    this.searchType.emit(t);
  }

}
