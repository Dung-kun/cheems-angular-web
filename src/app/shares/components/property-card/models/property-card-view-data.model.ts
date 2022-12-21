import { ViewData } from '../../../base/models/view-data.model';
import { ProductType } from '../../../../data/models/product-type.model';


export class PropertyCardViewData extends ViewData {
  constructor(
    public productType: ProductType = new ProductType()
  )
  {
    super();
  }
}
