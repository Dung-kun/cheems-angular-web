import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../shares/base/services/auth.service';
import { NotificationService } from '../../../shares/base/services/notification.service';
import { NotificationModule } from '../../../shares/components/notification/notification.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
  providers: [AuthService, NotificationService],
  exports: []
})
export class LoginModule { }
