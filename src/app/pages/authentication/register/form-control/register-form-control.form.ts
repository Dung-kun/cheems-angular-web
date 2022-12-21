import { BasicFormViewFormControls } from '../../../../shares/base/models/basic-form-view.form-control';
import { FormControl } from '@angular/forms';
export class RegisterFormControl extends BasicFormViewFormControls {
  constructor(
    public email: FormControl = new FormControl(''),
    public fullname: FormControl = new FormControl(''),
    public dob: FormControl = new FormControl(''),
    public password: FormControl = new FormControl(''),
    public rePassword: FormControl = new FormControl(''),
  ){
    super()
  }
}
