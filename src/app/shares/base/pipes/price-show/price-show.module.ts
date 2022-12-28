import { NgModule } from '@angular/core';
import { PriceShowPipe } from './price-show.pipe';



@NgModule({
  declarations: [
    PriceShowPipe
  ],
  exports: [PriceShowPipe]
})
export class PriceShowModule { }
