import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information.component';
import { PersonalInformationSideNavModule } from './child-components/personal-information-side-nav/personal-information-side-nav.module';
import { PersonalInformationRoutingModule } from './personal-information-routing.module';
import { PersonalInformationProfileModule } from './child-components/personal-information-profile/personal-information-profile.module';



@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [
    CommonModule,
    PersonalInformationSideNavModule,
    PersonalInformationRoutingModule,
    PersonalInformationProfileModule
  ],
  exports: [PersonalInformationComponent]
})
export class PersonalInformationModule { }
