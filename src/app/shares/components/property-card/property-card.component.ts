import { Component, Input, OnInit } from '@angular/core';
import { PageViewModelBasedComponent } from '../../base/framework/page-view-model-based-component';
import { PropertyCardPageViewModel } from './models/property-card-page-view.model';
import { combineLatest, BehaviorSubject, of, switchMap, map } from 'rxjs';
import { PropertyCardViewData } from './models/property-card-view-data.model';
import { NotificationService } from '../../base/services/notification.service';
import { AuthService } from '../../base/services/auth.service';
import { CartItem } from '@app/data/models/cart-item.model';
import { AddCartItemMutation } from '@app/pages/product-details/graphql/add-cart-item.mutation';
import { CartIdQuery } from '@app/shares/base/graphql/cart-id.query';
import { QueryRef, Mutation } from 'apollo-angular';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent
  extends PageViewModelBasedComponent<PropertyCardPageViewModel>
  implements OnInit
{
  public appQuery: QueryRef<{}, {}>;
  public appMutation: Mutation;

  public styleMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  constructor(
    private notificationService: NotificationService,
    private auth: AuthService,
    public cartIdQuery: CartIdQuery,
    public cartItemMutation: AddCartItemMutation
  ) {
    super();

    this.appQuery = cartIdQuery.watch({}, { fetchPolicy: 'cache-and-network' });
    this.appMutation = cartItemMutation;
    this.pageViewModel$ = new BehaviorSubject<PropertyCardPageViewModel>(
      new PropertyCardPageViewModel()
    );
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([value]) => {
      let _value = value as PropertyCardViewData;
      if (!!!value) {
        _value = new PropertyCardViewData();
      }

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        productType: _value.productType,
      });
    });

    this.subscriptions$.push(onInit);
  }

  onAddItemToCart() {
    const checkLogin$ = this.auth.isAuthenticated.pipe(
      switchMap((value) => {
        if (!value) return of(null);
        else {
          const MUS_VAR = {
            input: {
              usersIds: [this.auth.getUserId],
            },
          };

          return this.appQueryCardId(MUS_VAR);
        }
      })
    );

    const pipe$ = checkLogin$.pipe(
      switchMap((value) => {
        if (!!!value) return of(null);
        else {
          const MUS_VAR = {
            input: {
              amount: 1,
              cartsId: value.cartId,
              productTypesId: this.pageViewModel$.getValue().productType.id,
            },
          };

          return this.appMutationCardItem(MUS_VAR);
        }
      })
    );

    const checkAddItem = pipe$.subscribe((value) => {
      if (!!value) {
        this.notificationService.success(
          'Thành công',
          'Bạn đã thêm thành công sản phẩm vào giỏ'
        );
      } else {
        this.notificationService.warning(
          'Chú ý',
          'Bạn cần phải đăng nhập trước'
        );
      }
    });

    this.subscriptions$.push(checkAddItem);
  }

  appQueryCardId(vars: any) {
    let queryGQL = this.appQuery;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const cartId = item ? (<any>item).carts.items[0].id : null;
        return {
          cartId,
        };
      })
    );

    return p$;
  }

  appMutationCardItem(vars: any) {
    let mutationGQL = this.appMutation;
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item
          ? (<any>item).addCartItem.cartItems
          : (null as CartItem);
        return {
          item: _item,
        };
      })
    );

    return p$;
  }
}
