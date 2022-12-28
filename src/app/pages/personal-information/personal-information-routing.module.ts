import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationAddressComponent } from './child-components/personal-information-address/personal-information-address.component';
import { PersonalInformationOrderComponent } from './child-components/personal-information-order/personal-information-order.component';
import { PersonalInformationProfileComponent } from './child-components/personal-information-profile/personal-information-profile.component';
import { PersonalInformationComponent } from './personal-information.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationComponent,
    children: [
      {
        path: 'profile/:userIdentifier',
        component: PersonalInformationProfileComponent
      },
      {
        path: 'address/:userIdentifier',
        component: PersonalInformationAddressComponent
      },
      {
        path: 'order/:userIdentifier',
        component: PersonalInformationOrderComponent
      },
      { path: '**',   redirectTo: '', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationRoutingModule {}
