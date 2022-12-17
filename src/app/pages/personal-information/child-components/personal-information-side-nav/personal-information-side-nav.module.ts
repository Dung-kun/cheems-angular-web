import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationSideNavComponent } from './personal-information-side-nav.component';
import { PersonalInformationAccountDisplayModule } from './child-components/personal-information-account-display/personal-information-account-display.module';



@NgModule({
  declarations: [
    PersonalInformationSideNavComponent
  ],
  imports: [
    CommonModule,
    PersonalInformationAccountDisplayModule
  ],
  exports: [PersonalInformationSideNavComponent]
})
export class PersonalInformationSideNavModule { }
