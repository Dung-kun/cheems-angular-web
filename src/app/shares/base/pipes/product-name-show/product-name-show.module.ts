import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductNameShowPipe } from './product-name-show.pipe';



@NgModule({
  declarations: [
    ProductNameShowPipe
  ],
  exports: [ProductNameShowPipe]
})
export class ProductNameShowModule { }
