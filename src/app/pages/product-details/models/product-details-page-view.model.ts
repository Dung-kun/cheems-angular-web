import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { ProductType } from '../../../data/models/product-type.model';
export class ProductDetailsPageViewModel extends PageViewModel {
  constructor(
    public productType: ProductType = null
  ){
    super();
  }
}
