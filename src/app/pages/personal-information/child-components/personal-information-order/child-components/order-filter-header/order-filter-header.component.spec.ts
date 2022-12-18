import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilterHeaderComponent } from './order-filter-header.component';

describe('OrderFilterHeaderComponent', () => {
  let component: OrderFilterHeaderComponent;
  let fixture: ComponentFixture<OrderFilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFilterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
