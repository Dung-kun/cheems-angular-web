import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shares/base/services/auth.service';
import { PageViewModelBasedComponent } from '../../shares/base/framework/page-view-model-based-component';
import { HeaderPageViewModel } from './models/header-page-view.model';
import { switchMap, BehaviorSubject, map, of, combineLatest } from 'rxjs';
import { CurrentUserQuery } from '../../shares/base/graphql/current-user.query';
import { QueryRef } from 'apollo-angular';
import { User } from '@app/data/models/user.model';
import { RefreshTokenQuery } from '../../shares/base/graphql/refresh-token.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends PageViewModelBasedComponent<HeaderPageViewModel>
  implements OnInit
{
  public appQuery: QueryRef<{}, {}>;
  public appRefreshTokenQueryIns: QueryRef<{}, {}>;

  constructor(
    private auth: AuthService,
    public userQuery: CurrentUserQuery,
    public refreshTokenQuery: RefreshTokenQuery
  ) {
    super();

    this.pageViewModel$ = new BehaviorSubject<HeaderPageViewModel>(
      new HeaderPageViewModel()
    );
    this.appQuery = userQuery.watch({}, { fetchPolicy: 'cache-and-network' });
    this.appRefreshTokenQueryIns = refreshTokenQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
  }

  ngOnInit(): void {
    this.auth.autoLogin();
    const onInit$ = combineLatest([this.auth.isAuthenticated]).pipe(
      switchMap(([value]) => {
        if (!!this.auth.getRefreshTokenToken) {
          const MUS_VAR = {
            refreshToken: this.auth.getRefreshTokenToken,
          };
          console.log('vv', this.auth.getRefreshTokenToken);
          return this.appRefreshToken(MUS_VAR);
        } else return of(null);
      })
    );

    const pipe$ = onInit$.pipe(
      switchMap((value) => {
        if(value) {
          this.auth.saveUserData(null, value?.token, null);

          return this.appCurrentUserQuery();
        }

        return of(null);
      })
    );

    const onInit = pipe$.subscribe({
      next: (value) => {
        if (!!value) {
          const user = value?.user as User;
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            user,
          });

          this.auth.saveUserData(user.id);
        }
      },
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
        return {
          user,
        };
      })
    );

    return p$;
  }

  appRefreshToken(vars: any) {
    let queryGQL = this.appRefreshTokenQueryIns;
    queryGQL.setVariables(vars);
    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const token = item ? (<any>item).refreshToken.accessToken : null;
        return {
          token,
        };
      })
    );

    return p$;
  }

  logout() {
    this.auth.logout();
    this.pageViewModel$.next({
      ...this.pageViewModel$.getValue(),
      user: new User(),
    });
  }
}
