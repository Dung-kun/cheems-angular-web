import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyShowPipe } from './currency-show.pipe';



@NgModule({
  declarations: [
    CurrencyShowPipe
  ],
  exports: [CurrencyShowPipe]
})
export class CurrencyShowModule { }
