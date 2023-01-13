import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, timeout, take } from 'rxjs/operators';
import { Filters } from './child-components/order-filter-header/models/filters.model';
import { OrderFilterHeaderViewData } from './child-components/order-filter-header/models/order-filter-header-view-data.model';
import { OrderStatusModalViewData } from './child-components/order-status-modal/models/order-status-modal-view-data.model';
import { OrderStatusModalComponent } from './child-components/order-status-modal/order-status-modal.component';
import { GET_PERSONAL_ORDERS } from './graphql/get-personal-order-list.graphql';
import { PersonalInformationOrderPageViewModel } from './models/personal-information-order-page-view.model';

@Component({
  selector: 'app-personal-information-order',
  templateUrl: './personal-information-order.component.html',
  styleUrls: ['./personal-information-order.component.scss']
})
export class PersonalInformationOrderComponent extends PageViewModelBasedComponent<PersonalInformationOrderPageViewModel> implements OnInit {
  @ViewChild(OrderStatusModalComponent)
  orderStatusModal: OrderStatusModalComponent;

  showStatusWindown: Boolean = false;

  public orderStatusModalViewData$: BehaviorSubject<OrderStatusModalViewData>;

  public filterHeaderViewData$: BehaviorSubject<OrderFilterHeaderViewData>;

  public filter$: BehaviorSubject<Filters>;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
  ) {
    super();

    this.orderStatusModalViewData$ = new BehaviorSubject<OrderStatusModalViewData>(new OrderStatusModalViewData(''));

    this.filterHeaderViewData$ = new BehaviorSubject<OrderFilterHeaderViewData>(new OrderFilterHeaderViewData(null));

    this.filter$ = new BehaviorSubject<Filters>(new Filters())
  }

  ngOnInit(): void {
    let onInit$ = combineLatest([this.route.params, this.filter$])
      .pipe(
        tap(([param, filter]) => {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            personalIdentifier: param['userIdentifier']
          })
          this.filterHeaderViewData$.next({
            ...this.filterHeaderViewData$.getValue(),
            filter$: this.filter$
          })
        }),
        switchMap(([viewData, filter]) => {
          console.log(filter);
          let orderStatus = filter.filterStatus !== "" ? filter.filterStatus : null
          let MUT_VARS = {
            input: {
              isDeleted: false,
              usersIds: [this.pageViewModel$.getValue().personalIdentifier],
              status: orderStatus
            }
          }

          const appQueryImpl$ = this.appInitQuery(MUT_VARS);
          return appQueryImpl$;
        })
      );

    let onInit = onInit$.subscribe((val) => {
      if(val) {
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(), ...{
           orders: val.orders.items
          }
        });
      }
    })

    this.subscriptions$.push(onInit);
  }

  appInitQuery(variables: any) {
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: GET_PERSONAL_ORDERS,
      variables: variables
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let orders = item ? (<any>item).orders : [];

        return {
          orders: orders,
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

  onOpenStatusWindown(order: any): void {
    this.orderStatusModalViewData$.next({
      ...this.orderStatusModalViewData$.getValue(),
      ...{
        order: order
      },
    });

    this.showStatusWindown = true;

  }

  onCloseStatusWindown(): void {
    this.showStatusWindown = false;

  }

}
