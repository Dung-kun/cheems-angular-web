import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';



@NgModule({
  declarations: [NewProductComponent],
  imports: [
    CommonModule
  ],
  exports: [NewProductComponent]
})
export class NewProductModule { }
