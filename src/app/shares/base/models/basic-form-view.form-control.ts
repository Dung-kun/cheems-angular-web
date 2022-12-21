import { FormControl, FormGroup, Validators } from "@angular/forms";

export class BasicFormViewFormControls {
  constructor(
    public id : FormControl = new FormControl({value: null, disabled:true}),
   ) { }
}


