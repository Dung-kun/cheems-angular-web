import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information.component';



@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [
    CommonModule
  ],
  exports: [PersonalInformationComponent]
})
export class PersonalInformationModule { }
