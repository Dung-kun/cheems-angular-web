import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
      },
    ]),
  ]
})
export class CheckoutModule { }
