import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationAccountDisplayComponent } from './personal-information-account-display.component';

describe('PersonalInformationAccountDisplayComponent', () => {
  let component: PersonalInformationAccountDisplayComponent;
  let fixture: ComponentFixture<PersonalInformationAccountDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationAccountDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationAccountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
