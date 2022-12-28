import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { FormViewComponent } from '../../shares/base/framework/form-view.component';
import { CheckoutPageViewModel } from './models/checkout-page-view.model';
import { User } from '../../data/models/user.model';
import { BehaviorSubject, combineLatest, tap, switchMap, of, map } from 'rxjs';
import { CartItem } from '@app/data/models/cart-item.model';
import { QueryRef, Mutation } from 'apollo-angular';
import { CartItemListQuery } from './graphql/cart-item-list.query';
import { CurrentUserQuery } from '@app/shares/base/graphql/current-user.query';
import { CheckoutFormControls } from './form-controls/checkout-form-control.form';
import { CheckoutValidation } from './validation/checkout.validation';
import { PaymentMethodQuery } from './graphql/payment-method.query';
import { ItemBasic } from '../../data/models/item-basic.model';
import { CreateOrderMutation } from './graphql/create-order.mutation';
import { NotificationService } from '../../shares/base/services/notification.service';
import { CreateCustomerPaymentMutation } from './graphql/create-customer-payment.mutation';
import { UpdateUserMutation } from '../../shares/base/graphql/update-user.mutation';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent
  extends FormViewComponent<CheckoutPageViewModel>
  implements OnInit
{
  public validation: CheckoutValidation = null;
  public checkShippingChoose: number;

  public appQueryCardItemsIns: QueryRef<{}, {}>;
  public appQueryUser: QueryRef<{}, {}>;
  public appQueryPaymentMethodIns: QueryRef<{}, {}>;

  public appMutationCreateOrderIns: Mutation;
  public appMutationUpdateUserIns: Mutation;
  public appMutationCreateCustomerPaymentIns: Mutation;

  public checkOpenForm: boolean = true;
  public checkOpenPaymentMethod: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    public cartItemListQuery: CartItemListQuery,
    public currentUserQuery: CurrentUserQuery,
    public paymentMethodQuery: PaymentMethodQuery,
    public createOrderMutation: CreateOrderMutation,
    public updateUserMutation: UpdateUserMutation,
    public createCustomerPaymentMutation: CreateCustomerPaymentMutation,
    private notificationService: NotificationService,
    private readonly router: Router
  ) {
    super(fb);

    this.pageViewModel$ = new BehaviorSubject<CheckoutPageViewModel>(
      new CheckoutPageViewModel()
    );
    this.appQueryCardItemsIns = this.cartItemListQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
    this.appQueryUser = this.currentUserQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
    this.appQueryPaymentMethodIns = this.paymentMethodQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );

    this.appMutationCreateOrderIns = this.createOrderMutation;
    this.appMutationCreateCustomerPaymentIns =
      this.createCustomerPaymentMutation;
    this.appMutationUpdateUserIns = this.updateUserMutation;

    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
    this.validation = new CheckoutValidation(this);
    this.checkShippingChoose = 0;
  }



  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteQueryParams()]).pipe(
      switchMap(([queryParams]) => {
        const cartId = queryParams['cartId'] || null;
        const cartItemsIds = queryParams['cartItemsIds'] || [];

        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          cartId,
          cartItemsIds,
        });

        const MUS_VAR = {
          input: {
            ids: cartItemsIds,
          },
        };

        return combineLatest([
          this.appQueryCardItems(MUS_VAR),
          this.appPaymentMethodQuery({ input: {} }),
        ]);
      })
    );

    const onInit = onInit$.subscribe(([valueCart, valuePayment]) => {
      const cartItems = valueCart.cartItems as CartItem[];
      const paymentMethods = valuePayment.paymentMethods as ItemBasic[];

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        cartItems,
        paymentMethods,
      });
    });

    const getUser$ = this.appCurrentUserQuery();
    const getUser = getUser$.subscribe((value) => {
      const userInfo = value.user as User;
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        userInfo,
      });

      console.log('user', userInfo);

      this.appForm = this.appCreateFormGroup(
        this.prepareFormBodyControls(userInfo)
      );
      if (this.appForm.valid) this.checkOpenForm = false;
    });

    this.subscriptions$.push(onInit);
    this.subscriptions$.push(getUser);

    this.validation = new CheckoutValidation(this);
  }

  ngxOnSubmit(): void {
    const rawValue = this.formBody()?.getRawValue();
    const MUS_VAR = {
      input: {
        id: rawValue?.id || null,
        fullname: rawValue?.fullname || null,
        phone: rawValue?.phone || null,
        address: rawValue?.address || null,
        dob: rawValue?.day
          ? new Date(`${rawValue.month + 1}-${rawValue.day}-${rawValue?.year}`)
          : null,
      },
    };
    const userMutation$ = this.appUpdateUserMutation(MUS_VAR);
    const userMutation = userMutation$.subscribe((value) => {
      const _user = value.user as User;

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        userInfo: { ...this.pageViewModel$.getValue().userInfo, ..._user },
      });

      this.notificationService.success(
        'Thành công',
        'Lưu thông tin thành công'
      );
      this.checkOpenForm = false;
    });

    this.subscriptions$.push(userMutation);
  }

  prepareFormBodyControls(user?: User): FormGroup {
    const bodyControl = this.scaffoldFormControl(user);
    const formBody = this.fb.group(bodyControl);

    return formBody;
  }

  scaffoldFormControl(user?: User): BasicFormViewFormControls {
    const bodyFormControl: CheckoutFormControls = {
      id: this.fb.control(user?.id),
      fullname: this.fb.control(user?.fullname || '', [Validators.required]),
      email: this.fb.control(user?.email || ''),
      phone: this.fb.control(user?.phone || '', [Validators.required]),
      day: this.fb.control(new Date(user?.dob)?.getDate() || null, [
        Validators.min(1),
        Validators.max(31),
        Validators.required,
      ]),
      month: this.fb.control(new Date(user?.dob)?.getMonth() + 1 || null, [
        Validators.min(1),
        Validators.max(12),
        Validators.required,
      ]),
      year: this.fb.control(new Date(user?.dob)?.getFullYear() || null, [
        Validators.min(new Date().getFullYear() - 200),
        Validators.max(new Date().getFullYear() - 16),
        Validators.required,
      ]),
      address: this.fb.control(user?.address || ''),
    };

    return bodyFormControl;
  }

  createOrder() {
    const data = this.pageViewModel$.getValue();
    const varsCreate = {
      input: {
        userId: data.userInfo.id,
        paymentMethodsId:data.paymentMethods[this.checkShippingChoose].id,
        address: data.userInfo.address
      }
    }

    const createCusPayment$ = this.appCreateCustomerPaymentMutation(varsCreate).pipe(
      switchMap((value) => {
        console.log('pay',value)
        const MUS_VAR = {
          input: {
            userId: data.userInfo.id,
            paymentTotal: this.total(data.cartItems),
            addressFrom: 'KTX khu A ĐHQG',
            addressTo: data.userInfo.address,
            cartItemsIds: data.cartItemsIds,
            customerPaymentId: value.idPayment,
          },
        };

        return this.appCreateOrderMutation(MUS_VAR);
      })
    );

    const orderCreate = createCusPayment$.subscribe((value) => {
      this.notificationService.success('Thành công', 'Bạn đã mua thành công sản phẩm', 4000);
      setTimeout(() => {
        this.router.navigate(['/personal-information/order', data.userInfo.id]);
      }, 1000);
    })

    this.subscriptions$.push(orderCreate);
  }

  appQueryCardItems(vars: any) {
    let queryGQL = this.appQueryCardItemsIns;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const cartItems = item ? (<any>item).cartItems.items : null;
        return {
          cartItems,
        };
      })
    );

    return p$;
  }

  appCurrentUserQuery() {
    let queryGQL = this.appQueryUser;
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

  appPaymentMethodQuery(vars: any) {
    let queryGQL = this.appQueryPaymentMethodIns;
    queryGQL.setVariables(vars);
    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const paymentMethods = item ? (<any>item).paymentMethods.items : null;
        return {
          paymentMethods,
        };
      })
    );

    return p$;
  }

  appCreateOrderMutation(vars: any) {
    let mutationGQL = this.appMutationCreateOrderIns;
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item ? (<any>item).createOrder.orders : null;

        return {
          orders: _item,
        };
      })
    );

    return p$;
  }

  appUpdateUserMutation(vars: any) {
    let mutationGQL = this.appMutationUpdateUserIns;
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item ? (<any>item).updateUser.users : null;

        return {
          user: _item,
        };
      })
    );

    return p$;
  }


  deleteCartItem(index : number) {
    let cartItems = [...this.pageViewModel$.getValue().cartItems];
    let cartItemsIds = [...this.pageViewModel$.getValue().cartItemsIds];

    cartItems.splice(index,1);
    cartItemsIds.splice(index,1);

    if(cartItems.length == 0) {
      this.router.navigate(['/shopping-cart']);
    } else {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        cartItems,
        cartItemsIds
      })
    }


  }

  appCreateCustomerPaymentMutation(vars: any) {
    let mutationGQL = this.appMutationCreateCustomerPaymentIns;
    let mutation$ = mutationGQL.mutate(vars);

    let o$ = mutation$;

    let p$ = o$.pipe(
      switchMap((_) => {
        return of(_);
      }),
      map((result) => {
        const item = (<any>result).data;

        let _item = item
          ? (<any>item).createCustomerPayment.customerPayments.id
          : null;

        return {
          idPayment: _item,
        };
      })
    );

    return p$;
  }



  total(cartItems: CartItem[]){
    const totalDiscounted = cartItems.reduce((value, item) => {
      return (
        value +
        item.amount *
          item.productTypes[0].price *
          (1 - (item.productTypes[0]?.discountPercentage || 0))
      );
    }, 0);

    return totalDiscounted*(1.08);
  }

  onClickEdit() {
    this.checkOpenForm = true;
  }

  onClickChoose(check: boolean) {
    this.checkOpenPaymentMethod = check;
  }

  onClickCancel() {
    const user = this.pageViewModel$.getValue().userInfo;
    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls(user));
    this.checkOpenForm = false;
  }

  openForm() {
    this.checkOpenForm = true;
  }

  checkCancelButton() {
    const user = this.pageViewModel$.getValue().userInfo;
    const array = Object.values(user);
    for (let i = 0; i < array.length; i++) {
      if (!!!array[i]) return false;
    }

    return true;
  }

  chooseShipping(a: number) {
    this.checkShippingChoose = a;
  }

  appRouteQueryParams() {
    console.log(this.route);
    return this.route.queryParams;
  }
}
