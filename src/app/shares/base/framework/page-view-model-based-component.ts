import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ComponentMode } from "../models/component-mode.enum";
import { PageViewModel } from "../models/page-view.model";
import { ChildViewManagement, IBaseChildViewManagement } from "./child-view.management";



export interface IPageViewModelBasedComponent<TPageViewModel extends PageViewModel> extends IBaseChildViewManagement {
  pageViewModel$: BehaviorSubject<TPageViewModel>;
}

@Component({template:''})
export abstract class PageViewModelBasedComponent<TPageViewModel extends PageViewModel> extends ChildViewManagement implements IPageViewModelBasedComponent<TPageViewModel> {

  public pageViewModel$: BehaviorSubject<TPageViewModel> = null;
  constructor(
    ) {
    super();

    this.pageViewModel$ = new BehaviorSubject<TPageViewModel>(null);
  }

  appQueryMain(){}
}
