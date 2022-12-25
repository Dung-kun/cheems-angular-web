import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, of, tap, map } from 'rxjs';
import { ProductDetailsViewData } from './models/product-details-view-data.model';
import { PageViewModelBasedComponent } from '../../shares/base/framework/page-view-model-based-component';
import { ProductDetailsPageViewModel } from './models/product-details-page-view.model';
import { ProductTypeQuery } from './graphql/productType.query';
import { QueryRef } from 'apollo-angular';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ProductDetailsResult } from './models/product-details-result.model';
import { ProductIntroductionViewData } from './child-components/product-introduction/models/product-introduction-view-data.model';
import { ProductDescriptionViewData } from './child-components/product-description/models/product-description-view-data.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent
  extends PageViewModelBasedComponent<ProductDetailsPageViewModel>
  implements OnInit
{
  public appGetProductTypeQuery: QueryRef<{}, {}>;
  public pdIntroductionViewData$: BehaviorSubject<ProductIntroductionViewData>;
  public pdDescriptionViewData$: BehaviorSubject<ProductDescriptionViewData>;

  constructor(
    private readonly route: ActivatedRoute,
    public productTypeQuery: ProductTypeQuery
  ) {
    super();

    this.appGetProductTypeQuery = productTypeQuery.watch(
      {},
      { fetchPolicy: 'cache-and-network' }
    );

    this.pageViewModel$ = new BehaviorSubject<ProductDetailsPageViewModel>(
      new ProductDetailsPageViewModel()
    );

    this.pdDescriptionViewData$ =
      new BehaviorSubject<ProductDescriptionViewData>(
        new ProductDescriptionViewData()
      );
    this.pdIntroductionViewData$ =
      new BehaviorSubject<ProductIntroductionViewData>(
        new ProductIntroductionViewData()
      );
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      tap(([value]) => {
        const viewData = value as ProductDetailsViewData;
      }),
      switchMap(([value]) => {
        let viewData = value as ProductDetailsViewData;
        if (!!!viewData) {
          viewData = new ProductDetailsViewData();
        }

        const mus_var = {
          input: {
            ids: viewData.id,
          },
        };
        return this.appOnInit(mus_var);
      })
    );

    const onInit = onInit$.subscribe((value) => {
      const result = value as ProductDetailsResult;
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          productType: result.productType,
        },
      });

      this.pdDescriptionViewData$.next(
        new ProductDescriptionViewData(result.productType)
      );
      this.pdIntroductionViewData$.next(
        new ProductIntroductionViewData(result.productType)
      );
    });

    this.subscriptions$.push(onInit);
  }

  appOnInit(vars: any) {
    let queryGQL = this.appGetProductTypeQuery;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const productType = item ? (<any>item).productTypes.items[0] : null;
        return {
          productType,
        } as ProductDetailsResult;
      })
    );

    return p$;
  }

  appRouteParams() {
    return this.route.params;
  }
}
