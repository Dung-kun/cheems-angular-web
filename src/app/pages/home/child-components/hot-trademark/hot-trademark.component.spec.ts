import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotTrademarkComponent } from './hot-trademark.component';

describe('HotTrademarkComponent', () => {
  let component: HotTrademarkComponent;
  let fixture: ComponentFixture<HotTrademarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotTrademarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotTrademarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
