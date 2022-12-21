import { Component, OnInit } from '@angular/core';
import { ProductListDetailsPageViewModel } from './models/product-list-details-page-view.model';
import { combineLatest, map, of, switchMap, BehaviorSubject } from 'rxjs';
import { ProductListFilterQuery } from './graphql/product-list-filter.query';
import { QueryRef } from 'apollo-angular';
import { ProductListDetailsViewData } from './models/product-list-details-view-data.model';
import { ProductTypeFilterInput } from '../../../../data/models/product-type-filter-input.model';
import { tap } from 'rxjs/operators';
import { PaginationPageViewModelComponent } from '../../../../shares/base/framework/pagination-page-view-model-component';
import { ProductListDetailsResult } from './models/product-list-details-result.model';
import { ProductType } from '@app/data/models/product-type.model';
import { PropertyCardViewData } from '@app/shares/components/property-card/models/property-card-view-data.model';

@Component({
  selector: 'app-product-list-details',
  templateUrl: './product-list-details.component.html',
  styleUrls: ['./product-list-details.component.scss'],
})
export class ProductListDetailsComponent
  extends PaginationPageViewModelComponent<ProductListDetailsPageViewModel>
  implements OnInit
{
  public productListQueryIns: QueryRef<{}, {}>;

  constructor(public appProductQuery: ProductListFilterQuery) {
    super();

    let pageViewModel = new ProductListDetailsPageViewModel();
    pageViewModel.paginationIdx = 'productListDetailsId';
    this.pageViewModel$ = new BehaviorSubject<ProductListDetailsPageViewModel>(
      pageViewModel
    );

    this.productListQueryIns = appProductQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {}),
      switchMap(([viewData]) => {
        const _viewData = viewData as ProductListDetailsViewData;
        return this.appOnInit(_viewData.productTypeFilterInput);
      })
    );

    const onInit = onInit$.subscribe((value: ProductListDetailsResult) => {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          pageInfo: value.pageInfo,
          productList: value.productList,
        },
      });

      this.COUNT = value.totalCount;
    });

    this.subscriptions$.push(onInit);
  }

  appOnInit(productTypeFilterInput: ProductTypeFilterInput) {
    const vars = {
      input: productTypeFilterInput,
      skip: (this.CURRENT_PAGE - 1) * this.PAGE_SIZE,
      take: this.PAGE_SIZE,
    };
    let queryGQL = this.productListQueryIns;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const productList = item ? (<any>item).productTypes.items : null;
        const pageInfo = item ? (<any>item).productTypes.pageInfo : null;
        const totalCount = item ? (<any>item).productTypes.totalCount : 0;
        return {
          productList,
          pageInfo,
          totalCount,
        } as ProductListDetailsResult;
      })
    );

    return p$;
  }

  //pagination
  ngxOnPageChange(event: any) {
    if (
      (this.CURRENT_PAGE <= event &&
        this.pageViewModel$.getValue().pageInfo.hasNextPage) ||
      (this.CURRENT_PAGE >= event &&
        this.pageViewModel$.getValue().pageInfo.hasPreviousPage)
    ) {
      this.CURRENT_PAGE = event;
      console.log(event);
      this.items$.next({
        ...this.items$.getValue(),
      });
    }
  }

  onPropertyCardViewData(productType: ProductType) {
    const propertyCardViewData$ = new BehaviorSubject<PropertyCardViewData>(new PropertyCardViewData(productType));
    return propertyCardViewData$;
  }
}
