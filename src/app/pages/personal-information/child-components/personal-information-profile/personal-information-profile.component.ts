import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '@app/data/models/media.model';
import { User } from '@app/data/models/user.model';
import { FormViewComponent } from '@app/shares/base/framework/form-view.component';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { AuthService } from '@app/shares/base/services/auth.service';
import { Apollo, QueryRef } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, timeout, take } from 'rxjs/operators';
import { PersonalInformationProfileFormControl } from './form-controls/personal-information-profile-form-control';
import { PROFILE_QUERRY } from './graphql/profile-querry.graphql';
import { PersonalInformationProfilePageViewModel } from './models/personal-information-profile-page-view.model';

@Component({
  selector: 'app-personal-information-profile',
  templateUrl: './personal-information-profile.component.html',
  styleUrls: ['./personal-information-profile.component.scss']
})
export class PersonalInformationProfileComponent extends FormViewComponent<PersonalInformationProfilePageViewModel> implements OnInit {
  public appQuery: QueryRef<{}, {}>;

  constructor(
    _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private apollo: Apollo,
    public router: Router,
  ) {
    super(_formBuilder);

    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
  }

  ngOnInit(): void {
    let onInit$ = combineLatest([this.route.params])
      .pipe(
        tap(([param]) => {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            personalIdentifier: param['userIdentifier']
          })
        }),
        switchMap(([viewData]) => {
          const appQueryImpl$ = this.appInitQuery();
          return appQueryImpl$;
        })
      );

    let onInit = onInit$.subscribe((val) => {
      if(val) {
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(), ...{
           componentResult: val.currentUser
          }
        });

        const formBodyControls = this.prepareFormBodyControls(val);

        this.appForm = this.appCreateFormGroup(formBodyControls);
        console.log(this.appForm);
      }
    })

    this.subscriptions$.push(onInit);
  }

  ngxOnSubmit(): void {
    throw new Error('Method not implemented.');
  }

  prepareFormBodyControls(results?: any): FormGroup {
    const bodyControl = this.scaffoldFormControl(results?.currentUser);
    const bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(anyResult?: User): BasicFormViewFormControls {
    const bodyControl: PersonalInformationProfileFormControl = {
      id: this._formBuilder.control(anyResult?.id),
      fullname: this._formBuilder.control(anyResult?.fullname),
      email: this._formBuilder.control(anyResult?.email),
      phone: this._formBuilder.control(anyResult?.phone),
      dob: this._formBuilder.control(anyResult?.dob),
      medias: this._formBuilder.control(anyResult?.medias),
    };

    return bodyControl;
  }

  appInitQuery() {
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: PROFILE_QUERRY,
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let currentUser = item ? (<any>item).currentUsers as User[] : [];
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          avatar: item ? (<any>item).currentUsers.medias as Media[] : []
        })
        return {
          currentUser: currentUser[0]
        };
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
      timeout(20000),
      take(1),
    )

    return p$;
  }

}
