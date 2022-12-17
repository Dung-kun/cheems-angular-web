import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {
  @Input() date: string = '';
  @Output() datePicked: EventEmitter;

  constructor() {
    this.datePicked = new EventEmitter();
  }

  ngOnInit(): void {

  }

}
