import { Component, OnInit } from '@angular/core';
import { FormViewComponent } from '../../../shares/base/framework/form-view.component';
import { RegisterFormViewModel } from './models/register-form-view.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterFormControl } from './form-control/register-form-control.form';
import { RegisterValidation } from './validation/register.validation';
import { Mutation } from 'apollo-angular';
import { RegisterMutation } from './graphql/register.mutation';
import { NotificationService } from '../../../shares/base/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent
  extends FormViewComponent<RegisterFormViewModel>
  implements OnInit
{
  public appMutationIns: Mutation;
  public validation: RegisterValidation = null;
  public typePassword: string;
  public typeRePassword: string;
  constructor(
    public fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public registerMutation: RegisterMutation,
    public notificationService: NotificationService
  ) {
    super(fb);

    this.typePassword = 'password';
    this.typeRePassword = 'password';
    this.appMutationIns = this.registerMutation;
    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]);

    const onInit = onInit$.subscribe((value) => {
      this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
    });

    console.log(this.formBody());

    this.subscriptions$.push(onInit);

    this.validation = new RegisterValidation(this);
  }

  prepareFormBodyControls(): FormGroup {
    const bodyControl = this.scaffoldFormControl();
    const formBody = this.fb.group(bodyControl);

    return formBody;
  }

  scaffoldFormControl(): BasicFormViewFormControls {
    const registerForm: RegisterFormControl = {
      id: new FormControl(''),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      fullname: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      rePassword: this.fb.control('', [Validators.required]),
    };

    return registerForm;
  }

  ngxOnSubmit() {
    const rawValue = this.formBody().getRawValue();
    console.log(rawValue);
    const vars = {
      input: {
        email: rawValue.email,
        fullname: rawValue.fullname,
        dob: rawValue.dob,
        password: rawValue.password,
      },
    };

    const appMutationImpl$ = this.appMutation(vars);

    const appMutationImpl = appMutationImpl$.subscribe(
      (value) => {
        this.notificationService.success(
          'Thành công!',
          value.message + ' trước khi đăng nhập.',
          3500
        );
      }
      // (error: any) => {
      //   this.notificationService.error('Thất bại!', 'Lỗi Server, vui lòng thử lại!', 3000);
      // },
    );

    this.subscriptions$.push(appMutationImpl);
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }

  appMutation(vars: any) {
    let mutationGQL = this.appMutationIns;
    // "Đăng kí thành công! Vui lòng kiểm tra email"
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item ? (<any>item).register.string : null;

        return {
          message: _item,
        };
      })
    );

    return p$;
  }

  appRouteParams() {
    return this.route.params;
  }

  changeTypePassword(value: string, check: boolean) {
    let temp = this.typeRePassword;
    if (check) {
      switch (value) {
        case 'password':
          this.typePassword = 'text';
          break;
        default:
          this.typePassword = 'password';
          break;
      }
    } else {
      switch (value) {
        case 'password':
          this.typeRePassword = 'text';
          break;
        default:
          this.typeRePassword = 'password';
          break;
      }
    }
  }

  checkValuePassword(){

  }
}
