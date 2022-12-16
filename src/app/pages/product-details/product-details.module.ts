import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';
import { ProductIntroductionComponent } from './child-components/product-introduction/product-introduction.component';
import { ProductDescriptionComponent } from './child-components/product-description/product-description.component';
import { ProductDescriptionModule } from './child-components/product-description/product-description.module';
import { ProductIntroductionModule } from './child-components/product-introduction/product-introduction.module';



@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDescriptionModule,
    ProductIntroductionModule,
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
