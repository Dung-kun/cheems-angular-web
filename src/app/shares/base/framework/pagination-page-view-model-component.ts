// import { SharedTitleService } from "@app/shared/services/shared-title.service";
import { BehaviorSubject } from "rxjs";
import { Injectable, OnDestroy, OnInit, Component } from '@angular/core';
import { PaginationPageViewModel } from "../models/pagination-page-view.model";
import { IPageViewModelBasedComponent, PageViewModelBasedComponent } from './page-view-model-based-component';
// import { DeveloperModeHelper } from "@app/shared/developer-mode.helper";
// import { BaseComponent } from "@app/pages/base/base.component";

export interface IPaginatedComponent<TPageViewModel extends PaginationPageViewModel> extends IPageViewModelBasedComponent<TPageViewModel> {
  PAGE_SIZE: number;
  CURRENT_PAGE: number;
  COUNT: number;
}

@Component({template:''})
export abstract class PaginationPageViewModelComponent<TPageViewModel extends PaginationPageViewModel> extends PageViewModelBasedComponent<TPageViewModel> implements IPaginatedComponent<TPageViewModel>, OnDestroy {

  PAGE_SIZE: number = 5;
  CURRENT_PAGE: number = 1;
  COUNT: number = 0

  _page = new BehaviorSubject<number>(this.CURRENT_PAGE);

  get page$() {
    return this._page;
  }

}
  // constructor(
  //   protected _sharedTitleService: SharedTitleService,
  //   protected developer: DeveloperModeHelper,
  //   ) {
  //     super(_sharedTitleService, developer)
  //   }}
