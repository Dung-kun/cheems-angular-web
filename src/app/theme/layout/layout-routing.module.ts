import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./../../pages/home/home.module').then(m => m.HomeModule)
    },

    {
      path: 'login',
      loadChildren: () => import('../../pages/authentication/login/login.module').then(m=>m.LoginModule)
    },

    {
      path: 'register',
      loadChildren: () => import('../../pages/authentication/register/register.module').then(m=>m.RegisterModule)
    },

    {
      path: 'product-list',
      loadChildren: () => import('./../../pages/product-list/product-list.module').then(m=>m.ProductListModule)
    },

    {
      path: 'product-details',
      loadChildren: () => import('./../../pages/product-details/product-details.module').then(m=>m.ProductDetailsModule)
    },

    {
      path: 'shopping-cart',
      loadChildren: () => import('./../../pages/shopping-cart/shopping-cart.module').then(m=>m.ShoppingCartModule)
    },

    {
      path: 'contact-us',
      loadChildren: () => import('./../../pages/contact-us/contact-us.module').then(m=>m.ContactUsModule)
    },
    {
      path: 'sales',
      loadChildren: () => import('./../../pages/sales/sales.module').then(m=>m.SalesModule)
    },
    {
      path: 'personal-information',
      loadChildren: () => import('./../../pages/personal-information/personal-information.module').then(m=>m.PersonalInformationModule)
    },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**',   redirectTo: '/home', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
