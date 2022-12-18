import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationAddressComponent } from './child-components/personal-information-address/personal-information-address.component';
import { PersonalInformationProfileComponent } from './child-components/personal-information-profile/personal-information-profile.component';
import { PersonalInformationReceiptComponent } from './child-components/personal-information-receipt/personal-information-receipt.component';
import { PersonalInformationComponent } from './personal-information.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationComponent,
    children: [
      {
        path: 'profile',
        component: PersonalInformationProfileComponent
      },
      {
        path: 'address',
        component: PersonalInformationAddressComponent
      },
      {
        path: 'receipt',
        component: PersonalInformationReceiptComponent
      },
      { path: '',   redirectTo: '/personal-information/profile', pathMatch: 'full' },
      { path: '**',   redirectTo: '/personal-information/profile', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationRoutingModule {}
