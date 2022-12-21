import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from '../../../data/models/product-type.model';
import { PageViewModelBasedComponent } from '../../base/framework/page-view-model-based-component';
import { PropertyCardPageViewModel } from './models/property-card-page-view.model';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { PropertyCardViewData } from './models/property-card-view-data.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent extends PageViewModelBasedComponent<PropertyCardPageViewModel> implements OnInit {
  public styleMoney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  constructor() {
    super();
    this.pageViewModel$ = new BehaviorSubject<PropertyCardPageViewModel>(new PropertyCardPageViewModel());
  }

  ngOnInit(): void {

    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([value]) => {
      let _value = value as PropertyCardViewData;
      if(!!!value) {
        _value = new PropertyCardViewData();
      }

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        productType: _value.productType
      })
    });

    this.subscriptions$.push(onInit);
  }

}
