import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusProgressItemComponent } from './status-progress-item.component';

describe('StatusProgressItemComponent', () => {
  let component: StatusProgressItemComponent;
  let fixture: ComponentFixture<StatusProgressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusProgressItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusProgressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
