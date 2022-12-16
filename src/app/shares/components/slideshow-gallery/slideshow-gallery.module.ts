import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowGalleryComponent } from './slideshow-gallery.component';



@NgModule({
  declarations: [
    SlideshowGalleryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SlideshowGalleryComponent]
})
export class SlideshowGalleryModule { }
