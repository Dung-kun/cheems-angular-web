import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { RouterModule } from '@angular/router';
import { PropertyCardModule } from '../../shares/components/property-card/property-card.module';



@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    PropertyCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: SalesComponent,
      },
    ]),
  ]
})
export class SalesModule { }
