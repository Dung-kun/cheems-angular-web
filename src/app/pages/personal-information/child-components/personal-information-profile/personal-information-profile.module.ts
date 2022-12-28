import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationProfileComponent } from './personal-information-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PersonalInformationProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonalInformationProfileModule { }
