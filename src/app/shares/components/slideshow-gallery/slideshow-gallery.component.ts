import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../data/models/media.model';

@Component({
  selector: 'app-slideshow-gallery',
  templateUrl: './slideshow-gallery.component.html',
  styleUrls: ['./slideshow-gallery.component.scss']
})
export class SlideshowGalleryComponent implements OnInit, AfterViewInit {
  @Input() medias: Media[] = [];
  slideIndex: number = 1;
  imageShowPath: string = "";

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n, n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number, value?: number) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let rows = document.querySelector(".row-img");

    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    (slides[this.slideIndex-1]as HTMLElement).style.display = "block";
    dots[this.slideIndex-1].className += " active";
    let dot = dots[this.slideIndex-1] as HTMLElement;

    if(this.slideIndex == 1){
      rows.scrollLeft = dot.offsetLeft;
    } else if (this.slideIndex == slides.length) {
      rows.scrollLeft = dot.offsetWidth + dot.offsetLeft;
    }
    else if(dot.offsetLeft + dot.offsetWidth > rows.clientWidth) {
      if(value != null && value == -1) rows.scrollLeft -= dot.offsetWidth;
      else rows.scrollLeft += dot.offsetWidth;
    }

  }

  changeImgShowPath(path: string) {
    this.imageShowPath = path;
  }

  onScroll(event: any) {
    console.log(event);
  }

}
