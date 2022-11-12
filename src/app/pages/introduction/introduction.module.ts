import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IntroductionComponent,
      },
    ]),
  ]
})
export class IntroductionModule { }
