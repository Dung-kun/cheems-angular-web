import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationModule } from '../../shares/components/notification/notification.module';
import { NotificationService } from '../../shares/base/services/notification.service';
import { PriceShowModule } from '../../shares/base/pipes/price-show/price-show.module';
import { CurrencyShowModule } from '../../shares/base/pipes/currency-show/currency-show.module';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    PriceShowModule,
    CurrencyShowModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
      },
    ]),
  ],
  providers: [NotificationService]
})
export class CheckoutModule { }
