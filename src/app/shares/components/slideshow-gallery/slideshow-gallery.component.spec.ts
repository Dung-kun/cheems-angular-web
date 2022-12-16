import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowGalleryComponent } from './slideshow-gallery.component';

describe('SlideshowGalleryComponent', () => {
  let component: SlideshowGalleryComponent;
  let fixture: ComponentFixture<SlideshowGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideshowGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
