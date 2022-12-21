import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product.component';
import { OwCarouselCardModule } from '../../../../shares/components/ow-carousel-card/ow-carousel-card.module';



@NgModule({
  declarations: [NewProductComponent],
  imports: [
    CommonModule,
    OwCarouselCardModule
  ],
  exports: [NewProductComponent]
})
export class NewProductModule { }
