import { BasicFormViewFormControls } from '../../../../shares/base/models/basic-form-view.form-control';
import { FormControl } from '@angular/forms';
export class LoginFormControl extends BasicFormViewFormControls {
  constructor(
    public email: FormControl = new FormControl(""),
    public password: FormControl = new FormControl("")
  ) {
    super();
  }
}
