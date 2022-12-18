import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationAddressComponent } from './personal-information-address.component';

describe('PersonalInformationAddressComponent', () => {
  let component: PersonalInformationAddressComponent;
  let fixture: ComponentFixture<PersonalInformationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
