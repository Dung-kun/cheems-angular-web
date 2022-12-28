import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';



@NgModule({
  declarations: [
    ProductViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProductViewComponent]
})
export class ProductViewModule { }
