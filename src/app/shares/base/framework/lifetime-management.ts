import { Subscription } from "rxjs";
import { Component, OnDestroy } from '@angular/core';

export interface ILifetimeManagement {
  subscriptions$ : Subscription[];
}

@Component({template:''})
export abstract class LifetimeManagement implements ILifetimeManagement, OnDestroy {

  ngOnDestroy(): void {
    this.subscriptions$.map(elem => {
      if(elem) {
        elem.unsubscribe();
      }
    });
  }

  private __subscriptions : Subscription[] = [];

  get subscriptions$(): Subscription[] {
    return this.__subscriptions;
  }

  constructor() { }

}
