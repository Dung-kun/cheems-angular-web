import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwCarouselCardComponent } from './ow-carousel-card.component';

describe('OwCarouselCardComponent', () => {
  let component: OwCarouselCardComponent;
  let fixture: ComponentFixture<OwCarouselCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwCarouselCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwCarouselCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
