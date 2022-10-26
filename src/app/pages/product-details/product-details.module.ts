import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';



@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductDetailsComponent,
      },
    ]),
    PropertyCardModule
  ],
  exports: []
})
export class ProductDetailsModule { }
