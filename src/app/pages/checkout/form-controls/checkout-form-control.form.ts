import { BasicFormViewFormControls } from '../../../shares/base/models/basic-form-view.form-control';
import { FormControl } from '@angular/forms';
export class CheckoutFormControls extends BasicFormViewFormControls {
  constructor(
    public fullname: FormControl = new FormControl(''),
    public email: FormControl = new FormControl(''),
    public phone: FormControl = new FormControl(''),
    public day: FormControl = new FormControl(''),
    public month: FormControl = new FormControl(''),
    public year: FormControl = new FormControl(''),
    public address: FormControl = new FormControl(''),
  ){
    super();
  }
}
