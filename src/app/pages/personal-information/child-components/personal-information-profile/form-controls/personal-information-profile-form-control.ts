import { FormControl } from '@angular/forms';
import { BasicFormViewFormControls } from '@app/shares/base/models/basic-form-view.form-control';
export class PersonalInformationProfileFormControl extends BasicFormViewFormControls {
  constructor(
    public fullname: FormControl = new FormControl(""),
    public email: FormControl = new FormControl(""),
    public phone: FormControl = new FormControl(""),
    public dob: FormControl = new FormControl(""),
    public medias: FormControl = new FormControl(""),
  ) {
    super();
  }
}
