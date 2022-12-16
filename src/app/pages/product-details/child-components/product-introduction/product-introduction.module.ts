import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIntroductionComponent } from './product-introduction.component';
import { SlideshowGalleryModule } from '../../../../shares/components/slideshow-gallery/slideshow-gallery.module';



@NgModule({
  declarations: [ProductIntroductionComponent],
  imports: [
    CommonModule,
    SlideshowGalleryModule
  ],
  exports: [ProductIntroductionComponent]
})
export class ProductIntroductionModule { }
