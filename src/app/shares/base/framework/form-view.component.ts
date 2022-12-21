import { Component } from '@angular/core';
import { IPageViewModelBasedComponent, PageViewModelBasedComponent } from './page-view-model-based-component';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { BasicFormViewFormControls } from "../models/basic-form-view.form-control";
import { FormViewPageViewModel } from "../models/form-view-page-view-model.model";

export interface IFormViewComponent<TPageViewModel extends FormViewPageViewModel> extends IPageViewModelBasedComponent<TPageViewModel> {


  prepareFormBodyControls(results : any) : FormGroup;

  scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicFormViewFormControls;

  ngxOnSubmit(): void;
}

@Component({template:''})
export abstract class FormViewComponent<TPageViewModel extends FormViewPageViewModel> extends PageViewModelBasedComponent<TPageViewModel> implements IFormViewComponent<TPageViewModel> {

  public appForm: FormGroup;


  formBody() : FormArray {
    return this.appForm.get('formBody') as FormArray;
  }

  constructor(public _formBuilder: FormBuilder) {
    super();

    this.appForm = this.appCreateFormGroup(this._formBuilder.group({}));
  }


  public appCreateFormGroup(bodyControls : FormGroup): FormGroup {

    var appFormGroup = this._formBuilder.group({
      formBody: bodyControls
    });

    return appFormGroup;
  }

  abstract ngxOnSubmit(): void;

  abstract prepareFormBodyControls(results : any) : FormGroup;

  abstract scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicFormViewFormControls;
}
