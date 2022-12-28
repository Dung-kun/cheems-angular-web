import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { CurrencyShowModule } from '@app/shares/base/pipes/currency-show/currency-show.module';



@NgModule({
  declarations: [
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    CurrencyShowModule
  ],
  exports: [ProductViewComponent]
})
export class ProductViewModule { }
