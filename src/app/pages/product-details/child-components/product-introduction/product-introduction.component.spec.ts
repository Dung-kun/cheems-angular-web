import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIntroductionComponent } from './product-introduction.component';

describe('ProductIntroductionComponent', () => {
  let component: ProductIntroductionComponent;
  let fixture: ComponentFixture<ProductIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
