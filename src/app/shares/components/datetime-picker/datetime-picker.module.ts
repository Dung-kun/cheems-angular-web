import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePickerComponent } from './datetime-picker.component';



@NgModule({
  declarations: [
    DatetimePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DatetimePickerComponent]
})
export class DatetimePickerModule { }
