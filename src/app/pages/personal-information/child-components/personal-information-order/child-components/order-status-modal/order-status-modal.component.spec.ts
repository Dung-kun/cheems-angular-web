import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusModalComponent } from './order-status-modal.component';

describe('OrderStatusModalComponent', () => {
  let component: OrderStatusModalComponent;
  let fixture: ComponentFixture<OrderStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
