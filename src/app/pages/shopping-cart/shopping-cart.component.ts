import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationPageViewModelComponent } from '../../shares/base/framework/pagination-page-view-model-component';
import { ShoppingCartPageViewModel } from './models/shopping-cart-page-view.model';
import { BehaviorSubject, combineLatest, map, noop, of, switchMap } from 'rxjs';
import { AuthService } from '../../shares/base/services/auth.service';
import { Mutation, QueryRef } from 'apollo-angular';
import { CartItem } from '@app/data/models/cart-item.model';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { CartItemUpdateMutation } from './graphql/cart-item-update.query';
import { CartQuery } from './graphql/cart.query';
import { NotificationService } from '../../shares/base/services/notification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent
  extends PaginationPageViewModelComponent<ShoppingCartPageViewModel>
  implements OnInit
{
  public appQueryCardIns: QueryRef<{}, {}>;
  public appQueryCardItemsIns: QueryRef<{}, {}>;
  public appMutationCardItemsIns: Mutation;
  public formArrayCheckBox: FormArray;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private auth: AuthService,
    private cardQuery: CartQuery,
    private cartItemListMutation: CartItemUpdateMutation,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();

    this.appQueryCardIns = this.cardQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );

    this.formArrayCheckBox = this.fb.array([]);
    this.appMutationCardItemsIns = this.cartItemListMutation;
    this.pageViewModel$ = new BehaviorSubject<ShoppingCartPageViewModel>(
      new ShoppingCartPageViewModel()
    );
  }

  getFormControl(index: number): FormControl {
    return this.formArrayCheckBox.at(index) as FormControl;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      switchMap(([value]) => {
        const MUS_VAR = {
          input: {
            usersIds: [this.auth.getUserId],
          },
        };
        return this.appQueryCard(MUS_VAR);
      })
    );

    const pipe$ = onInit$.pipe();

    const onInit = pipe$.subscribe((value) => {
      const cartItems = value.cartItems as CartItem[];
      const cartId = value.cartId;

      let formArray = this.fb.array([]);
      for (let i = 0; i < cartItems.length; i++) {
        formArray.push(this.fb.control(false));
      }
      this.formArrayCheckBox = formArray;

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        cartItems,
        cartId,
      });
    });

    this.subscriptions$.push(onInit);
  }

  totalMoney(cartItems: CartItem[], title: string) {
    const totalDiscounted = cartItems.reduce((value, item) => {
      return (
        value +
        item.amount *
          item.productTypes[0].price *
          (item.productTypes[0]?.discountPercentage || 0)
      );
    }, 0);

    const total = cartItems.reduce((value, item) => {
      return value + item.amount * item.productTypes[0].price;
    }, 0);

    if (title == 'total') {
      return total;
      // return cartItem.amount * cartItem.productTypes[0].price;
    } else if (title == 'discount') {
      return totalDiscounted;
    }

    return total - totalDiscounted;
  }

  onChangeProductAmount(value: any) {
    let cartItems = [...this.pageViewModel$.getValue().cartItems];
    let checkAmountChanged = [...this.pageViewModel$.getValue().checkAmountChanged];

    let index = cartItems.findIndex((data) => data.id == value?.cardItemId);

    let amount = cartItems[index]?.amount + (value?.amount || 0);
    if (
      !(amount <= 0 || amount > cartItems[index]?.productTypes[0].totalAmount)
    ) {
      let cartItemTemp = { ...cartItems[index], amount };

      if(!checkAmountChanged[index]) checkAmountChanged.splice(index, 1, true);
      cartItems.splice(index, 1, cartItemTemp);

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        cartItems,
        checkAmountChanged
      });
    }
  }

  onClickSubmit() {
    const rawValue = this.formArrayCheckBox.getRawValue();
    const cartItems = this.pageViewModel$.getValue().cartItems;
    const checkAmountChanged = this.pageViewModel$.getValue().checkAmountChanged;
    const cartId = this.pageViewModel$.getValue().cartId;

    for(let i = 0; i < checkAmountChanged.length; i ++){
      if(checkAmountChanged[i]) {
        let MUS_VAR = {
          input: {
            id: cartItems[i].id,
            amount: cartItems[i].amount
          }
        }

        const onMutation$ = this.appCartItemUpdate(MUS_VAR);

        const onMutation = onMutation$.subscribe((value) => {
          console.log(value);
        });

        this.subscriptions$.push(onMutation);
      }
    }

    let cartItemIdTemp: string[] = [];
    rawValue.forEach((element, index) => {
      if(element) cartItemIdTemp.push(cartItems[index].id);
    });

    console.log('ditmemay', cartItemIdTemp);

    this.router.navigate(['shopping-cart/checkout'], {
      queryParams: {
        cartItemsIds: [...cartItemIdTemp] || [],
        cartId: cartId || undefined
      },
      queryParamsHandling: "merge"
    }).then(noop);
  }

  goToProductList() {
    this.router.navigate(['/product-list']);
  }

  appQueryCard(vars: any) {
    let queryGQL = this.appQueryCardIns;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const cartId = item ? (<any>item).carts.items[0].id : null;
        const cartItems = item ? (<any>item).carts.items[0].cartItems : null;
        return {
          cartId,
          cartItems,
        };
      })
    );

    return p$;
  }



  appCartItemUpdate(vars: any) {
    let mutationGQL = this.appMutationCardItemsIns;
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item ? (<any>item).updateCartItem.cartItems : null;

        return {
          item: _item,
        };
      })
    );

    return p$;
  }

  appRouteParams() {
    return this.route.params;
  }
}
