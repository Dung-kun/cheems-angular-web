import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './theme/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '**',
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
