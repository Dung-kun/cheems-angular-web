import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { PersonalInformationPageViewModel } from './models/personal-information-page-view.model';
import { PersonalInformationViewData } from './models/personal-information-view-data.model';
import { PersonalInformationSideNavViewData } from './child-components/personal-information-side-nav/models/personal-information-side-nav-view-data.model';
import { AuthService } from '@app/shares/base/services/auth.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent extends PageViewModelBasedComponent<PersonalInformationPageViewModel> implements OnInit {
  personalInformationSideNavViewData$: BehaviorSubject<PersonalInformationSideNavViewData>;

  public title: string = '';
  public subtitle: string = '';

  showMenu = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public router: Router
    ) {
    super();

    this.personalInformationSideNavViewData$ = new BehaviorSubject<PersonalInformationSideNavViewData>(new PersonalInformationSideNavViewData(''));
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      tap((value) => {
        let _userId = this.authService.getUserId;
        let _isAuthenticated = this.authService.isAuthenticated;
        if (_isAuthenticated) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            personalIdentifier: _userId
          })
          console.log(_userId);
          this.router.navigate(["personal-information", "profile", _userId as string]);
        }
        else {
          this.router.navigate(["/home"]);
        }
      })
    ).subscribe(() => {
      this.personalInformationSideNavViewData$.next({
        ...this.personalInformationSideNavViewData$.getValue(),
        personalIdentifier: this.pageViewModel$.getValue().personalIdentifier
      })
    })

    const routeUrl$ = this.appRouteUrl().subscribe((val) => {
      switch (val[0]?.path) {
        case 'profile':
          this.title = "h??? S??";
          this.subtitle = "Qu???n l?? h??? s?? c???a b???n"
        break;

        case 'address':
          this.title = "?????a ch???";
          this.subtitle = "Qu???n l?? ?????a ch??? c???a b???n"
        break;

        case 'order':
          this.title = "????n h??ng";
          this.subtitle = "Qu???n l?? ????n h??ng c???a b???n"
        break;
      }
    })

    this.subscriptions$.push(routeUrl$);
    this.subscriptions$.push(onInit$);
  }



  appOnInit() {

  }

  appRouteParams() {
    console.log(this.route);
    return this.route.params;
  }

  appRouteUrl() {
    return this.route.children[0]?.url;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}

