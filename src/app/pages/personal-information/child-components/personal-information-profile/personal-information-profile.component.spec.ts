import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationProfileComponent } from './personal-information-profile.component';

describe('PersonalInformationProfileComponent', () => {
  let component: PersonalInformationProfileComponent;
  let fixture: ComponentFixture<PersonalInformationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
