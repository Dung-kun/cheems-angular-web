import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit {
  @Input() maxValue: number = 1000;
  @Input() minValue: number = 0;
  checkMin: boolean = false;
  checkMax: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onMouseUp(text: string, event: any) {
    if (text == 'min') this.checkMin = false;
    else this.checkMax = false;
  }

  onMouseDown(text: string, event: any) {
    if (text == 'min') this.checkMin = true;
    else this.checkMax = true;
  }

  onMouseMove(text: string, event: any) {
    if(text == "min" && this.checkMin) {
      
    }
    let x = event.clientX;
    let y = event.clientY;
  }
}
