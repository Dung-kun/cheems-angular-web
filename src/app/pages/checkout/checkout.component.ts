import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
import { FormViewComponent } from '../../shares/base/framework/form-view.component';
import { CheckoutPageViewModel } from './models/checkout-page-view.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends FormViewComponent<CheckoutPageViewModel> implements OnInit {

  public checkAddPhoneNumberDropDown: boolean;
  public checkShippingChoose: number;

  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(fb);

    this.checkAddPhoneNumberDropDown = false;
    this.checkShippingChoose = 1;
   }

  ngOnInit(): void {
  }

  ngxOnSubmit(): void {
    throw new Error('Method not implemented.');
  }
  prepareFormBodyControls(results?: any): FormGroup {
    throw new Error('Method not implemented.');
  }
  scaffoldFormControl(anyResult?: any): BasicFormViewFormControls {
    throw new Error('Method not implemented.');
  }

  addPhoneNumber() {
    this.checkAddPhoneNumberDropDown = !this.checkAddPhoneNumberDropDown;
  }

  chooseShipping(a: number) {
    this.checkShippingChoose = a;
  }

  appRouteQueryParams() {
    return this.route.queryParams;
  }

}
