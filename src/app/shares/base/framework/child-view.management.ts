import { BehaviorSubject } from "rxjs";

import { Component, Input } from "@angular/core";
import { ViewData } from "../models/view-data.model";
import { LifetimeManagement } from "./lifetime-management";

export interface IBaseChildViewManagement {
  _items: BehaviorSubject<ViewData>;
}


@Component({template:''})
export class ChildViewManagement extends LifetimeManagement implements IBaseChildViewManagement {

  constructor() {
    super();
  }
  _items = new BehaviorSubject<ViewData>(null);

  @Input() set items(value: ViewData) {
    this._items.next(value);
  }

  get items() {
    return this._items.getValue();
  }

  get items$() {
    return this._items;
  }
}
