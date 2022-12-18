import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { PersonalInformationPageViewModel } from './models/personal-information-page-view.model';
import { PersonalInformationViewData } from './models/personal-information-view-data.model';
import { PersonalInformationSideNavViewData } from './child-components/personal-information-side-nav/models/personal-information-side-nav-view-data.model';

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

  constructor(private route: ActivatedRoute,) {
    super();

    this.personalInformationSideNavViewData$ = new BehaviorSubject<PersonalInformationSideNavViewData>(new PersonalInformationSideNavViewData(''));
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      tap((value) => {
        let _userId = localStorage.getItem('userId');
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          personalIdentifier: _userId
        })
      })
    ).subscribe(() => {
      this.personalInformationSideNavViewData$.next({
        ...this.personalInformationSideNavViewData$.getValue(),
        personalIdentifier: this.pageViewModel$.getValue().personalIdentifier
      })
    })

    const routeUrl$ = this.appRouteUrl().subscribe((val) => {
      switch (val[0].path) {
        case 'profile':
          this.title = "hồ Sơ";
          this.subtitle = "Quản lí hồ sơ của bạn"
        break;

        case 'address':
          this.title = "Địa chỉ";
          this.subtitle = "Quản lí địa chỉ của bạn"
        break;

        case 'order':
          this.title = "Đơn hàng";
          this.subtitle = "Quản lí đơn hàng của bạn"
        break;
      }
    })

    this.subscriptions$.push(routeUrl$);
    this.subscriptions$.push(onInit$);
  }



  appOnInit() {

  }

  appRouteParams() {
    console.log(this.route)
    return this.route.params;
  }

  appRouteUrl() {
    return this.route.children[0]?.url;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

