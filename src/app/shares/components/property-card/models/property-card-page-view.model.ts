import { ProductType } from '@app/data/models/product-type.model';
import { PageViewModel } from '../../../base/models/page-view.model';

export class PropertyCardPageViewModel extends PageViewModel {
  constructor(
    public productType: ProductType = new ProductType()
  ){
    super();
  }
}
