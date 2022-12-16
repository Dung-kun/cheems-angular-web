import { ViewData } from '../../../../../shares/base/models/view-data.model';
import { ProductType } from '../../../../../data/models/product-type.model';


export class ProductIntroductionViewData extends ViewData {
  constructor(
    public productType: ProductType = null
  ){
    super();
  }
}
