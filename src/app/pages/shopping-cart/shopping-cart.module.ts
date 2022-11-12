import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';



@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingCartComponent,
      },

      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ]),
  ]
})
export class ShoppingCartModule { }
