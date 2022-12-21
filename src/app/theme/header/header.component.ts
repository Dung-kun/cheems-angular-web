import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shares/base/services/auth.service';
import { PageViewModelBasedComponent } from '../../shares/base/framework/page-view-model-based-component';
import { HeaderPageViewModel } from './models/header-page-view.model';
import { switchMap, BehaviorSubject, map, of } from 'rxjs';
import { CurrentUserQuery } from '../../shares/base/graphql/current-user.query';
import { QueryRef } from 'apollo-angular';
import { User } from '@app/data/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends PageViewModelBasedComponent<HeaderPageViewModel> implements OnInit {

  public appQuery: QueryRef<{}, {}>;
  constructor(
    private auth: AuthService,
    public userQuery: CurrentUserQuery
  ) {

    super();
    this.pageViewModel$ = new BehaviorSubject<HeaderPageViewModel>(new HeaderPageViewModel());
    this.appQuery = userQuery.watch({}, {fetchPolicy: 'cache-and-network'});
  }

  ngOnInit(): void {
    this.auth.autoLogin();
    const onInit$ = this.auth.isAuthenticated.pipe(
      switchMap((value) => {
        console.log('vl', value)
        if(value) {

          return this.appCurrentUserQuery();
        } else return of(null);
      })
    )

    const onInit = onInit$.subscribe((value) => {
      if(!!value) {
        const user = value?.user as User;
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          user
        });

        this.auth.saveUserData(user.id);
      }
    });

    this.subscriptions$.push(onInit);
  }

    appCurrentUserQuery() {
    let queryGQL = this.appQuery;
    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const user = item ? (<any>item).currentUsers[0] : null;

        console.log('vl', user)
        return {
          user
        }
      })
    );

    return p$;
  }

}
