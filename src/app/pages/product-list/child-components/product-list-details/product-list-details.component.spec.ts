import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListDetailsComponent } from './product-list-details.component';

describe('ProductListDetailsComponent', () => {
  let component: ProductListDetailsComponent;
  let fixture: ComponentFixture<ProductListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
