import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationOrderComponent } from './personal-information-order.component';
import { OrderFilterHeaderModule } from './child-components/order-filter-header/order-filter-header.module';
import { OrderCardModule } from './child-components/order-card/order-card.module';



@NgModule({
  declarations: [
    PersonalInformationOrderComponent
  ],
  imports: [
    CommonModule,
    OrderFilterHeaderModule,
    OrderCardModule
  ],
  exports: [PersonalInformationOrderComponent]
})
export class PersonalInformationOrderModule { }
