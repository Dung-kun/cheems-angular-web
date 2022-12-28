import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CheckoutModule } from '../checkout/checkout.module';
import { CartCardModule } from '../../shares/components/cart-card/cart-card.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from '../../shares/components/pagination/pagination.module';
import { CurrencyShowModule } from '../../shares/base/pipes/currency-show/currency-show.module';
import { NotificationModule } from '../../shares/components/notification/notification.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PriceShowModule } from '../../shares/base/pipes/price-show/price-show.module';



@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    CartCardModule,
    PaginationModule,
    CurrencyShowModule,
    NotificationModule,
    ReactiveFormsModule,
    FormsModule,
    PriceShowModule,
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
