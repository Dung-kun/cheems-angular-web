import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusModalComponent } from './order-status-modal.component';
import { StatusProgressItemModule } from './child-component/status-progress-item/status-progress-item.module';



@NgModule({
  declarations: [
    OrderStatusModalComponent
  ],
  imports: [
    CommonModule,
    StatusProgressItemModule
  ],
  exports: [OrderStatusModalComponent]
})
export class OrderStatusModalModule { }
