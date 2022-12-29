import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusModalComponent } from './order-status-modal.component';
import { StatusProgressItemModule } from './child-component/status-progress-item/status-progress-item.module';
import { ProductViewModule } from './child-component/product-view/product-view.module';
import { CurrencyShowModule } from '@app/shares/base/pipes/currency-show/currency-show.module';



@NgModule({
  declarations: [
    OrderStatusModalComponent
  ],
  imports: [
    CommonModule,
    StatusProgressItemModule,
    ProductViewModule,
    CurrencyShowModule
  ],
  exports: [OrderStatusModalComponent]
})
export class OrderStatusModalModule { }
