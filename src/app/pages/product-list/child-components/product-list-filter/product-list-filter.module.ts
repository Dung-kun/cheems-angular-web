import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListFilterComponent } from './product-list-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductListFilterComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ProductListFilterComponent]
})
export class ProductListFilterModule { }
