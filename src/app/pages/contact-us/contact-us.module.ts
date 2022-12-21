import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';



@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactUsComponent,
      },
    ]),
  ]
})
export class ContactUsModule { }
