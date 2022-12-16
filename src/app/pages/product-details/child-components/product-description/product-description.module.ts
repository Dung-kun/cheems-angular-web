import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionComponent } from './product-description.component';



@NgModule({
  declarations: [ProductDescriptionComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductDescriptionComponent]
})
export class ProductDescriptionModule { }
