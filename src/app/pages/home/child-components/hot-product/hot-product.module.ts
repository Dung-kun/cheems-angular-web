import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotProductComponent } from './hot-product.component';



@NgModule({
  declarations: [HotProductComponent],
  imports: [
    CommonModule
  ],
  exports: [HotProductComponent]
})
export class HotProductModule { }
