import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusProgressItemComponent } from './status-progress-item.component';



@NgModule({
  declarations: [
    StatusProgressItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [StatusProgressItemComponent]
})
export class StatusProgressItemModule { }
