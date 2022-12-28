import { Component, OnInit } from '@angular/core';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { NewProductViewModel } from './_models/new-product-view-model.model';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { NewProductFilterQuery } from './graphql/new-product-filter.query';
import { Router } from '@angular/router';
import { ProductListDetailsResult } from '@app/pages/product-list/child-components/product-list-details/models/product-list-details-result.model';
import { ProductType } from '@app/data/models/product-type.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent extends PageViewModelBasedComponent<NewProductViewModel>  implements OnInit {

  public queryNewProduct: QueryRef<{},{}>;
  public carouselId: string;
  constructor(
    public newProductFilter: NewProductFilterQuery,
    public router: Router
  ) {
    super();

    this.carouselId = "newProductCarouselId";
    this.pageViewModel$ = new BehaviorSubject<NewProductViewModel>(new NewProductViewModel());
    this.queryNewProduct = newProductFilter.watch({}, {fetchPolicy: "cache-and-network"});
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]).pipe(
      switchMap((value) => this.appOnInit())
    );

    const onInit = onInit$.subscribe((value) => {
      const newProductTypes = value.productList as ProductType[];

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        newProductTypes
      });
    });

    this.subscriptions$.push(onInit);
  }

  appOnInit() {
    let MUS_VAR = {
      input : {
        tags: ['new']
      },
      skip: 0,
      take: 12
    }

    let queryGQL = this.queryNewProduct;
    queryGQL.setVariables(MUS_VAR);

    let pipe$ = of(queryGQL);

    let p$ = pipe$.pipe(
      switchMap((_) => _.refetch()),
      map((result) => {
        const item = (<any>result).data;
        const productList = item ? (<any>item).productTypes.items : null;
        return {
          productList
        }
      })
    );

    return p$;
  }


}
