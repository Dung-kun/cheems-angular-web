import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCardComponent } from './cart-card.component';
import { CurrencyShowModule } from '../../base/pipes/currency-show/currency-show.module';



@NgModule({
  declarations: [
    CartCardComponent
  ],
  imports: [
    CommonModule,
    CurrencyShowModule
  ],
  exports: [CartCardComponent]
})
export class CartCardModule { }
