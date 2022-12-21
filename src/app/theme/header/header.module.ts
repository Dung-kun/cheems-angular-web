import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shares/base/services/auth.service';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [AuthService],
  exports: [HeaderComponent]
})
export class HeaderModule { }
