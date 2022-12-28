import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusModalComponent } from './order-status-modal.component';
import { StatusProgressItemModule } from './child-component/status-progress-item/status-progress-item.module';
import { ProductViewModule } from './child-component/product-view/product-view.module';



@NgModule({
  declarations: [
    OrderStatusModalComponent
  ],
  imports: [
    CommonModule,
    StatusProgressItemModule,
    ProductViewModule
  ],
  exports: [OrderStatusModalComponent]
})
export class OrderStatusModalModule { }
