import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationReceiptComponent } from './personal-information-receipt.component';

describe('PersonalInformationReceiptComponent', () => {
  let component: PersonalInformationReceiptComponent;
  let fixture: ComponentFixture<PersonalInformationReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
