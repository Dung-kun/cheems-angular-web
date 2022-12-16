import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwCarouselCardComponent } from './ow-carousel-card.component';
import { PropertyCardModule } from '../property-card/property-card.module';



@NgModule({
  declarations: [OwCarouselCardComponent],
  imports: [
    CommonModule,
    PropertyCardModule
  ],
  exports: [OwCarouselCardComponent]
})
export class OwCarouselCardModule { }
