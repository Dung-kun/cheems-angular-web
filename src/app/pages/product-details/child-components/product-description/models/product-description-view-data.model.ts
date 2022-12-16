import { ViewData } from '../../../../../shares/base/models/view-data.model';
import { ProductType } from '../../../../../data/models/product-type.model';
export class ProductDescriptionViewData extends ViewData {
  constructor(
    public productType: ProductType = null
  ){
    super();
  }
}
