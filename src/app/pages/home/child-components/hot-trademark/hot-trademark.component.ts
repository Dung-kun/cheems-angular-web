import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';
import { combineLatest, map, of, switchMap, BehaviorSubject } from 'rxjs';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { HotTrademarkPageViewModel } from './models/hot-trademark-page-view.model';
import { ManufacturersQuery } from '../../../../shares/base/graphql/manufacturers-query.query';
import { ProductTypeFilterInput } from '../../../../data/models/product-type-filter-input.model';


@Component({
  selector: 'app-hot-trademark',
  templateUrl: './hot-trademark.component.html',
  styleUrls: ['./hot-trademark.component.scss'],
})
export class HotTrademarkComponent
  extends PageViewModelBasedComponent<HotTrademarkPageViewModel>
  implements OnInit
{
  public appQuery: QueryRef<{}, {}>;
  constructor(
    private readonly router: Router,
    public trademarkQuery: ManufacturersQuery
  ) {
    super();

    this.pageViewModel$ = new BehaviorSubject<HotTrademarkPageViewModel>(new HotTrademarkPageViewModel());
    this.appQuery = this.trademarkQuery.watch({}, {fetchPolicy: 'cache-and-network'});
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      switchMap(() => this.appDropdownQuery())
    );

    const onInit = onInit$.subscribe((value) => {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        manufacturers: value.manufacturers
      });
    });

    this.subscriptions$.push(onInit);
  }

  appDropdownQuery() {
    const vars = {
      input: {
        isDeleted: false,
      },
      skip: 0,
      take: 4
    };
    let queryGQL = this.appQuery;
    queryGQL.setVariables(vars);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const manufacturers = item ? (<any>item).manufacturers.items : null;
        return {
          manufacturers
        };
      })
    );

    return p$;
  }
  onClickButton(manufacturersId: string) {
    let productTypeFilterInput: ProductTypeFilterInput = new ProductTypeFilterInput();
    productTypeFilterInput.metaDatas.manufacturersIds.push(manufacturersId);

    this.router.navigate(['/product-list', productTypeFilterInput]);
  }
}
