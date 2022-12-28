import { Component, OnInit } from '@angular/core';
import { ChildViewManagement } from '../../../../shares/base/framework/child-view.management';
import { combineLatest, BehaviorSubject, switchMap, of, map, noop } from 'rxjs';
import { ProductType } from '../../../../data/models/product-type.model';
import { ProductIntroductionViewData } from './models/product-introduction-view-data.model';
import { AuthService } from '../../../../shares/base/services/auth.service';
import { Query, QueryRef, Mutation } from 'apollo-angular';
import { CartIdQuery } from '../../../../shares/base/graphql/cart-id.query';
import { AddCartItemMutation } from '../../graphql/add-cart-item.mutation';
import { NotificationService } from '../../../../shares/base/services/notification.service';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { ProductIntroductionPageViewModel } from './models/product-introduction-page-view.model';
import { CartItem } from '../../../../data/models/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-introduction',
  templateUrl: './product-introduction.component.html',
  styleUrls: ['./product-introduction.component.scss'],
})
export class ProductIntroductionComponent
  extends PageViewModelBasedComponent<ProductIntroductionPageViewModel>
  implements OnInit
{
  public styleMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  public pdTypeItem$: BehaviorSubject<ProductType>;
  public appQuery: QueryRef<{}, {}>;
  public appMutation: Mutation;

  constructor(
    private auth: AuthService,
    public cartIdQuery: CartIdQuery,
    public cartItemMutation: AddCartItemMutation,
    private notificationService: NotificationService,
    private readonly router: Router
  ) {
    super();

    this.appQuery = cartIdQuery.watch({}, { fetchPolicy: 'cache-and-network' });
    this.appMutation = cartItemMutation;
    this.pdTypeItem$ = new BehaviorSubject<ProductType>(new ProductType());
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([value]) => {
      const result = value as ProductIntroductionViewData;
      this.pdTypeItem$.next(result.productType);

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        productType: result.productType,
      });
    });

    this.subscriptions$.push(onInit);
  }

  onBuyNow() {
    this.onAddItemToCart();
    this.router.navigate(['/checkout'], {
      queryParams: {
        cardItems: [].push(this.pageViewModel$.getValue().cartItem),
      },
      queryParamsHandling: 'merge'
    }).then(noop);
  }

  onAddItemToCart() {
    const checkLogin$ = this.auth.isAuthenticated.pipe(
      switchMap((value) => {
        if (!value) return of(null);
        else {
          const MUS_VAR = {
            input: {
              usersIds:  [this.auth.getUserId],
            }
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

          console.log(MUS_VAR);
          return this.appMutationCardItem(MUS_VAR);
        }
      })
    );

    const checkAddItem = pipe$.subscribe((value) => {
      if (!!value) {
        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          cartItem: value.item,
        });
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

        let _item = item ? (<any>item).addCartItem.cartItems : (null as CartItem);
        return {
          item: _item,
        };
      })
    );

    return p$;
  }

  // setNameProduct(item: ProductType) {
  //   const metadata = item.metaDatas;
  //   return item.name + " " + metadata.seriesName + " (" + metadata.cPUSeries + "/RAM" + metadata.ram + "/" + metadata.hardDrive + ")";
  // }
}
