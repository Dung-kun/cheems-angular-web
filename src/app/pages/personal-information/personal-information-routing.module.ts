import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationProfileComponent } from './child-components/personal-information-profile/personal-information-profile.component';
import { PersonalInformationComponent } from './personal-information.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationComponent,
    children: [
      {
        path: '',
        component: PersonalInformationProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationRoutingModule {}
