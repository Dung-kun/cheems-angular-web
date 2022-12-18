import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationOrderComponent } from './personal-information-order.component';

describe('PersonalInformationOrderComponent', () => {
  let component: PersonalInformationOrderComponent;
  let fixture: ComponentFixture<PersonalInformationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
