import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListDetailsComponent } from './product-list-details.component';
import { PropertyCardModule } from '../../../../shares/components/property-card/property-card.module';
import { PaginationModule } from '../../../../shares/components/pagination/pagination.module';



@NgModule({
  declarations: [
    ProductListDetailsComponent
  ],
  imports: [
    CommonModule,
    PropertyCardModule,
    PaginationModule
  ],
  exports: [ProductListDetailsComponent]
})
export class ProductListDetailsModule { }
