import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationAccountDisplayComponent } from './personal-information-account-display.component';



@NgModule({
  declarations: [
    PersonalInformationAccountDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PersonalInformationAccountDisplayComponent]
})
export class PersonalInformationAccountDisplayModule { }
