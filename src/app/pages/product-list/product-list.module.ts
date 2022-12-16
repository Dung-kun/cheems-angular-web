import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';




@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: ':id',
        loadChildren: ()=> import('./../product-details/product-details.module').then(m=>m.ProductDetailsModule)
      }
    ]),
    PropertyCardModule,
    NgxSliderModule
  ]
})
export class ProductListModule { }
