import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './order-card.component';
import { CurrencyShowModule } from '@app/shares/base/pipes/currency-show/currency-show.module';



@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    CurrencyShowModule
  ],
  exports: [OrderCardComponent]
})
export class OrderCardModule { }
