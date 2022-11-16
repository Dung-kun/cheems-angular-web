import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CheckoutModule } from '../checkout/checkout.module';



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
        loadChildren: () => import('./../checkout/checkout.module').then(m=>m.CheckoutModule)
      },
      {
        path: '**',
        component: ShoppingCartComponent,
      },

    ]),
  ]
})
export class ShoppingCartModule { }
