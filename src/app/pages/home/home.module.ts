import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';
import { NewProductModule } from './child-components/new-product/new-product.module';
import { HotProductModule } from './child-components/hot-product/hot-product.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NewProductModule,
    HotProductModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    PropertyCardModule
  ],
  exports: []
})
export class HomeModule { }
