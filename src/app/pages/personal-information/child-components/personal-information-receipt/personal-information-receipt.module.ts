import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationReceiptComponent } from './personal-information-receipt.component';



@NgModule({
  declarations: [
    PersonalInformationReceiptComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PersonalInformationReceiptComponent]
})
export class PersonalInformationReceiptModule { }
