import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFilterHeaderComponent } from './order-filter-header.component';



@NgModule({
  declarations: [
    OrderFilterHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [OrderFilterHeaderComponent]
})
export class OrderFilterHeaderModule { }
