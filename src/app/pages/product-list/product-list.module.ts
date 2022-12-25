import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductListFilterModule } from './child-components/product-list-filter/product-list-filter.module';
import { ProductListDetailsModule } from './child-components/product-list-details/product-list-details.module';




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
        path: 'product/:id',
        loadChildren: ()=> import('./../product-details/product-details.module').then(m=>m.ProductDetailsModule)
      },
    ]),
    ProductListFilterModule,
    ProductListDetailsModule,
    PropertyCardModule,
    NgxSliderModule
  ]
})
export class ProductListModule { }
