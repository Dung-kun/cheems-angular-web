import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonalInformationComponent,
      },
    ]),
  ],
  exports: [PersonalInformationComponent]
})
export class PersonalInformationModule { }
