import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIntroductionComponent } from './product-introduction.component';
import { SlideshowGalleryModule } from '../../../../shares/components/slideshow-gallery/slideshow-gallery.module';
import { ProductNameShowModule } from '../../../../shares/base/pipes/product-name-show/product-name-show.module';
import { NotificationService } from '../../../../shares/base/services/notification.service';
import { NotificationModule } from '../../../../shares/components/notification/notification.module';



@NgModule({
  declarations: [ProductIntroductionComponent],
  imports: [
    CommonModule,
    SlideshowGalleryModule,
    ProductNameShowModule,
    NotificationModule
  ],
  providers: [NotificationService],
  exports: [ProductIntroductionComponent]
})
export class ProductIntroductionModule { }
