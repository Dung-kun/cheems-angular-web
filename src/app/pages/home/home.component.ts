import { Component, OnInit } from '@angular/core';
import { ProductTypeFilterInput } from '@app/data/models/product-type-filter-input.model';
import { of, switchMap, map, combineLatest, BehaviorSubject } from 'rxjs';
import { ProductListDetailsResult } from '../product-list/child-components/product-list-details/models/product-list-details-result.model';
import { QueryRef, Query } from 'apollo-angular';
import { ProductListQuery } from '../product-list/graphql/product-list-query.query';
import { ActivatedRoute } from '@angular/router';
import { OwCarouselCardViewData } from '../../shares/components/ow-carousel-card/models/ow-carousel-card-view-data.model';
import { take } from 'rxjs/operators';
import { ProductListFilterQuery } from '../product-list/child-components/product-list-details/graphql/product-list-filter.query';
import { ChildViewManagement } from '../../shares/base/framework/child-view.management';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ChildViewManagement implements OnInit {
  public productType$:  BehaviorSubject<OwCarouselCardViewData>;
  public productListQueryIns: QueryRef<{},{}>
  constructor(
    public route: ActivatedRoute,
    public query: ProductListFilterQuery
  ) {
    super();
    this.productType$ = new BehaviorSubject<OwCarouselCardViewData>(new OwCarouselCardViewData());
    this.productListQueryIns = query.watch({}, {fetchPolicy: 'cache-and-network'});
  }
  name: string = "";



  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      switchMap((value) => this.appOnInit())
    );
    const onInit = onInit$.subscribe((value) => {
      console.log(value);
      this.productType$.next({
        ...this.productType$.getValue(),
        ...{
          productTypes: value.productList
        }
      })
    })

    this.subscriptions$.push(onInit);
  }



  appOnInit() {
    const vars = {
      input: {
        isDeleted: false
      },
      skip: 0,
      take: 12,
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
        const totalCount = item? (<any>item).productTypes.totalCount : 0;
        return {
          productList,
          pageInfo,
          totalCount
        } as ProductListDetailsResult;
      })
    );

    return p$;
  }


  appRouteParams() {
    return this.route.params;
  }
}
