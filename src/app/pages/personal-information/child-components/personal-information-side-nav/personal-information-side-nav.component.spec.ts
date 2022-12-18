import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationSideNavComponent } from './personal-information-side-nav.component';

describe('PersonalInformationSideNavComponent', () => {
  let component: PersonalInformationSideNavComponent;
  let fixture: ComponentFixture<PersonalInformationSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
