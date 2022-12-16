import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, tap } from 'rxjs';
import { ProductDetailsViewData } from './models/product-details-view-data.model';
import { PageViewModelBasedComponent } from '../../shares/base/framework/page-view-model-based-component';
import { ProductDetailsPageViewModel } from './models/product-details-page-view.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends PageViewModelBasedComponent<ProductDetailsPageViewModel> implements OnInit {


  constructor(private route: ActivatedRoute,) {
    super();
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      tap(([value]) =>{
        console.log('vlol');
        const viewData = value as ProductDetailsViewData;
        console.log(viewData.id);
      })
    ).subscribe(() => {

    })
  }



  appOnInit() {

  }

  appRouteParams() {
    return this.route.params;
  }
}
