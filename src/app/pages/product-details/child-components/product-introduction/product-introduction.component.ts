import { Component, OnInit } from '@angular/core';
import { ChildViewManagement } from '../../../../shares/base/framework/child-view.management';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { ProductType } from '../../../../data/models/product-type.model';
import { ProductIntroductionViewData } from './models/product-introduction-view-data.model';

@Component({
  selector: 'app-product-introduction',
  templateUrl: './product-introduction.component.html',
  styleUrls: ['./product-introduction.component.scss']
})
export class ProductIntroductionComponent extends ChildViewManagement implements OnInit {

  public pdTypeItem$: BehaviorSubject<ProductType>;

  constructor() {
    super();

    this.pdTypeItem$ = new BehaviorSubject<ProductType>(new ProductType());
   }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([value]) => {
      const result = value as ProductIntroductionViewData;
      this.pdTypeItem$.next(result.productType);
    });

    this.subscriptions$.push(onInit);
  }


  setNameProduct(item: ProductType) {
    const metadata = item.metaDatas;
    return item.name + " " + metadata.seriesName + " (" + metadata.cPUSeries + "/RAM" + metadata.ram + "/" + metadata.hardDrive + ")";
  }
}
