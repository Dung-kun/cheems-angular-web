import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIntroductionComponent } from './product-introduction.component';
import { SlideshowGalleryModule } from '../../../../shares/components/slideshow-gallery/slideshow-gallery.module';
import { ProductNameShowModule } from '../../../../shares/base/pipes/product-name-show/product-name-show.module';



@NgModule({
  declarations: [ProductIntroductionComponent],
  imports: [
    CommonModule,
    SlideshowGalleryModule,
    ProductNameShowModule
  ],
  exports: [ProductIntroductionComponent]
})
export class ProductIntroductionModule { }
