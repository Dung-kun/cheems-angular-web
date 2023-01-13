import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { FilterProductModel } from './models/filer-product.model';
import { ProductListFilterViewData } from './child-components/product-list-filter/models/product-list-filter-view-data.model';
import { ProductListDetailsViewData } from './child-components/product-list-details/models/product-list-details-view-data.model';
import { ActivatedRoute } from '@angular/router';
import { ProductTypeFilterInput } from '../../data/models/product-type-filter-input.model';
import { PageViewModelBasedComponent } from '../../shares/base/framework/page-view-model-based-component';
import { ProductListPageViewModel } from './models/product-list-page-view.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent extends PageViewModelBasedComponent<ProductListPageViewModel> implements OnInit {

  public filterProductModel$: BehaviorSubject<FilterProductModel>;
  public productListFilterViewData$: BehaviorSubject<ProductListFilterViewData>;
  public productListDetailsViewData$: BehaviorSubject<ProductListDetailsViewData>;

  constructor(private readonly route: ActivatedRoute) {
    super();
    this.filterProductModel$ = new BehaviorSubject<FilterProductModel>(new FilterProductModel());
    this.productListDetailsViewData$ = new BehaviorSubject<ProductListDetailsViewData>(new ProductListDetailsViewData());
    this.productListFilterViewData$ = new BehaviorSubject<ProductListFilterViewData>(new ProductListFilterViewData());
  }

  ngOnInit(): void {
    const onInit$  = combineLatest([this.appRouteQueryParams()]);
    const onInit = onInit$.subscribe(([value]) => {

      let result = value as ProductTypeFilterInput;

      if(!!value) {
        result = new ProductTypeFilterInput();
      }

      this.filterProductModel$.next({
        productTypeFilterInput: result
      });

      this.productListFilterViewData$.next({
        filterInput: this.filterProductModel$
      });

    });

    this.subscriptions$.push(onInit);


    const onFilter$ = combineLatest([this.filterProductModel$]).pipe(
      debounceTime(500),
      map(([value]) => {
        const _value = value as FilterProductModel;
        return _value.productTypeFilterInput;
      })
    );

    const onFilter = onFilter$.subscribe((value: ProductTypeFilterInput) => {
      this.productListDetailsViewData$.next({
        productTypeFilterInput: value
      })
    });

    this.subscriptions$.push(onFilter);
  }


  appRouteQueryParams() {
    return this.route.queryParams;
  }
}
