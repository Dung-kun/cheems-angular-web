import { Component, OnInit } from '@angular/core';
import { FormViewComponent } from '../../../shares/base/framework/form-view.component';
import { RegisterFormViewModel } from './models/register-form-view.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RegisterFormControl } from './form-control/register-form-control.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormViewComponent<RegisterFormViewModel> implements OnInit {

  constructor(
    public fb: FormBuilder, private readonly  route: ActivatedRoute
  ) {
    super(fb);
    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]);

    const onInit = onInit$.subscribe((value) => {
    });

    this.subscriptions$.push(onInit);
  }


  ngxOnSubmit(): void {
    throw new Error('Method not implemented.');
  }


  prepareFormBodyControls(): FormGroup {
    const bodyControl = this.scaffoldFormControl();
    const formBody = this.fb.group({
      bodyControl
    })

    return formBody;
  }


  scaffoldFormControl(): BasicFormViewFormControls {
    const registerForm: RegisterFormControl = {
      id: new FormControl(''),
      email: this.fb.control(''),
      fullname: this.fb.control(''),
      dob: this.fb.control(''),
      password: this.fb.control(''),
      rePassword: this.fb.control('')
    }

    return registerForm;
  }


  appRouteParams() {
    return this.route.params;
  }

}
