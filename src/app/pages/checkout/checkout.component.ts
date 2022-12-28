import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { FormViewComponent } from '../../shares/base/framework/form-view.component';
import { CheckoutPageViewModel } from './models/checkout-page-view.model';
import { User } from '../../data/models/user.model';
import { BehaviorSubject, combineLatest, tap, switchMap, of, map } from 'rxjs';
import { CartItem } from '@app/data/models/cart-item.model';
import { QueryRef } from 'apollo-angular';
import { CartItemListQuery } from './graphql/cart-item-list.query';
import { CurrentUserQuery } from '@app/shares/base/graphql/current-user.query';
import { CheckoutFormControls } from './form-controls/checkout-form-control.form';
import { CheckoutValidation } from './validation/checkout.validation';

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
  public checkAddPhoneNumberDropDown: boolean;
  public checkShippingChoose: number;
  public appQueryCardItemsIns: QueryRef<{}, {}>;
  public appQueryUser: QueryRef<{}, {}>;

  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    public cartItemListQuery: CartItemListQuery,
    public currentUserQuery: CurrentUserQuery
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

    this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls());
    this.checkAddPhoneNumberDropDown = false;
    this.validation = new CheckoutValidation(this);
    this.checkShippingChoose = 1;
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteQueryParams()]).pipe(
      switchMap(([queryParams]) => {
        const cartId = queryParams['cartId'] || null;
        const cartItemsIds = queryParams['cartItemsIds'] || [];

        this.pageViewModel$.next({
          ...this.pageViewModel$.getValue(),
          cartId,
        });

        const MUS_VAR = {
          input: {
            ids: cartItemsIds,
          },
        };

        return this.appQueryCardItems(MUS_VAR);
      })
    );

    const onInit = onInit$.subscribe((value) => {
      const cartItems = value.cartItems as CartItem[];

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        cartItems,
      });
    });

    const getUser$ = this.appCurrentUserQuery();
    const getUser = getUser$.subscribe((value) => {
      const userInfo = value.user as User;
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        userInfo
      })

      this.appForm = this.appCreateFormGroup(this.prepareFormBodyControls(userInfo));
    })

    this.subscriptions$.push(onInit);
    this.subscriptions$.push(getUser);

    this.validation = new CheckoutValidation(this);
  }

  ngxOnSubmit(): void {
    throw new Error('Method not implemented.');
  }

  prepareFormBodyControls(user?: User): FormGroup {
    const bodyControl = this.scaffoldFormControl(user);
    const formBody = this.fb.group(bodyControl);

    return formBody;
  }

  scaffoldFormControl(user?: User): BasicFormViewFormControls {
    const bodyFormControl: CheckoutFormControls = {
      id: new FormControl(''),
      fullname: this.fb.control(user?.fullname || '', [Validators.required]),
      email: this.fb.control(user?.email || ''),
      phone: this.fb.control(user?.phone || '', [Validators.required]),
      day: this.fb.control(user?.dob?.getDate() || null, [Validators.min(1), Validators.max(31), Validators.required]),
      month: this.fb.control(user?.dob?.getMonth() || null, [Validators.min(1), Validators.max(12), Validators.required]),
      year: this.fb.control(user?.dob?.getFullYear() || null, [Validators.min((new Date()).getFullYear() - 200), Validators.max((new Date()).getFullYear() - 16), Validators.required]),
      address: this.fb.control(user?.address || ''),
    };

    return bodyFormControl;
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

  addPhoneNumber() {
    this.checkAddPhoneNumberDropDown = !this.checkAddPhoneNumberDropDown;
  }

  chooseShipping(a: number) {
    this.checkShippingChoose = a;
  }

  appRouteQueryParams() {
    console.log(this.route);
    return this.route.queryParams;
  }
}
