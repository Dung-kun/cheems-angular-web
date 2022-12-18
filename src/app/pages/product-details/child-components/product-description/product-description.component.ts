import { Component, OnInit } from '@angular/core';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { ProductDescriptionViewData } from './models/product-description-view-data.model';
import { ProductType } from '../../../../data/models/product-type.model';
import { PageViewModelBasedComponent } from '../../../../shares/base/framework/page-view-model-based-component';
import { ProductDescriptionPageViewModel } from './models/product-description-page-view.model';
import {
  ItemBasic,
  metaDataTitle,
} from '../../../../data/models/item-basic.model';
import { Manufacturer } from '../../../../data/models/manufacturer.model';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent
  extends PageViewModelBasedComponent<ProductDescriptionPageViewModel>
  implements OnInit
{
  constructor() {
    super();
    this.pageViewModel$ = new BehaviorSubject<ProductDescriptionPageViewModel>(
      new ProductDescriptionPageViewModel()
    );
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.items$]);


    const onInit = onInit$.subscribe(([value]) => {
      const result = value as ProductDescriptionViewData;
      const metadata = result.productType?.metaDatas;

      console.log(metadata);

      let generalInformation: ItemBasic[] = [];
      let detailedConfiguration: ItemBasic[] = [];

      for (let x in metadata) {
        let value = metadata[x as keyof typeof metadata];
        if (x == 'manufacturers') {
          value = (metadata[x as keyof typeof metadata] as Manufacturer[])[0]?.name;
          console.log('vl',value);
        }

        if (x == 'publishedDate') {
          value = (<Date>metadata[x as keyof typeof metadata]);
        }
        let item: ItemBasic = {
          id: "",
          name: metaDataTitle[x as keyof typeof metaDataTitle],
          value,
        };

        if (x == 'manufacturers' || x == 'seriesName') {
          generalInformation.push(item);
        } else {
          if(item.name && item.name != 'identifier')
            detailedConfiguration.push(item);
        }
      }

      const productType = result.productType;

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          detailedConfiguration,
          generalInformation,
          productType
        },
      });


      console.log(this.pageViewModel$.getValue());
    });

    this.subscriptions$.push(onInit);
  }
}
