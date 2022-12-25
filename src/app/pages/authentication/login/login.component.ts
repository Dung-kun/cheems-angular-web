import { Component, OnInit } from '@angular/core';
import { FormViewComponent } from '../../../shares/base/framework/form-view.component';
import { LoginFormViewModel } from './models/login-form-view.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { LoginFormControl } from './form-controls/login-form-control.form';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { LoginQuery } from './graphql/login.query';
import { AuthService } from '../../../shares/base/services/auth.service';
import { LoginValidation } from './validation/login.validation';
import { CurrentUserQuery } from '../../../shares/base/graphql/current-user.query';
import { NotificationService } from '../../../shares/base/services/notification.service';
import { GC_AUTH_TOKEN } from '../../../shares/base/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends FormViewComponent<LoginFormViewModel>
  implements OnInit
{
  public appQuery: QueryRef<{}, {}>;
  public appCUserQuery: QueryRef<{}, {}>;
  public validation: LoginValidation = null;
  public typePassword: string;
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public loginQuery: LoginQuery,
    public currentUserQuery: CurrentUserQuery,
    private auth: AuthService,
    public notificationService: NotificationService,
    public router: Router
  ) {
    super(fb);

    this.typePassword = 'password';
    this.appQuery = loginQuery.watch({}, { fetchPolicy: 'cache-and-network' });
    this.appCUserQuery = currentUserQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]);

    const onInit = onInit$.subscribe((value) => {
      this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
    });

    this.subscriptions$.push(onInit);

    this.validation = new LoginValidation(this);
  }

  ngxOnSubmit(): void {
    const rawValue = this.formBody().getRawValue();
    const MUS_VAR = {
      input: {
        email: rawValue?.email,
        password: rawValue?.password,
      },
    };

    const appQueryImpl$ = this.appLoginQuery(MUS_VAR);
    const pipe$ = appQueryImpl$.pipe();
    const appQueryImpl = pipe$.subscribe({
      next: (value) => {
        this.auth.saveUserData(null, value.accessToken);
        this.notificationService.success(
          'Thành công',
          'Bạn đã đăng nhập thành công'
        );
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err: any) => {
        this.notificationService.error(
          'Thất bại',
          'Sai tên đăng nhập hoặc mật khẩu'
        );
      },
    });

    this.subscriptions$.push(appQueryImpl);
  }
  prepareFormBodyControls(): FormGroup {
    const bodyControl = this.scaffoldFormControl();
    const formBody = this.fb.group(bodyControl);

    return formBody;
  }

  scaffoldFormControl(): BasicFormViewFormControls {
    const registerForm: LoginFormControl = {
      id: new FormControl(''),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
    };

    return registerForm;
  }

  appLoginQuery(vars: any) {
    let queryGQL = this.appQuery;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const accessToken = item ? (<any>item).login.accessToken : null;
        return {
          accessToken,
        };
      })
    );

    return p$;
  }

  // appCurrentUserQuery() {
  //   let queryGQL = this.appQuery;
  //   let pipe$ = of(queryGQL);

  //   let p$ = pipe$.pipe(
  //     switchMap((_) => _.refetch()),
  //     map((result) => {
  //       const item = (<any>result).data;
  //       const user = item ? (<any>item).currentUsers[0] : null;
  //       return {
  //         user
  //       }
  //     })
  //   );

  //   return p$;
  // }

  appRouteParams() {
    return this.route.params;
  }

  changeTypePassword() {
    switch (this.typePassword) {
      case 'password':
        this.typePassword = 'text';
        break;
      case 'text':
        this.typePassword = 'password';
        break;
      default:
        this.typePassword = 'password';
        break;
    }
  }
}
