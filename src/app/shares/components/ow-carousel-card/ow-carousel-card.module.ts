import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwCarouselCardComponent } from './ow-carousel-card.component';
import { PropertyCardModule } from '../property-card/property-card.module';
import { RouterModule } from '@angular/router';
import { ProductNameShowModule } from '../../base/pipes/product-name-show/product-name-show.module';



@NgModule({
  declarations: [OwCarouselCardComponent],
  imports: [
    CommonModule,
    PropertyCardModule,
    RouterModule,
    ProductNameShowModule
  ],
  exports: [OwCarouselCardComponent]
})
export class OwCarouselCardModule { }
