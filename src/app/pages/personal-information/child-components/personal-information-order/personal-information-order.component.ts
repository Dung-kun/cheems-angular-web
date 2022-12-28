import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PageViewModelBasedComponent } from '@app/shares/base/framework/page-view-model-based-component';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, timeout, take } from 'rxjs/operators';
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

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
  ) {
    super();

    this.orderStatusModalViewData$ = new BehaviorSubject<OrderStatusModalViewData>(new OrderStatusModalViewData(''));
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
          let MUT_VARS = {
            isDeleted: false,
            usersIds: ["6b71c56c-375d-4b52-9ee3-e6170e68256c"]
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
