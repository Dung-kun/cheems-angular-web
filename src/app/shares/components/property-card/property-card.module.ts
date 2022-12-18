import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from './property-card.component';
import { RouterModule } from '@angular/router';
import { ProductNameShowModule } from '../../base/pipes/product-name-show/product-name-show.module';



@NgModule({
  declarations: [PropertyCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductNameShowModule
  ],
  exports: [PropertyCardComponent]
})
export class PropertyCardModule { }
