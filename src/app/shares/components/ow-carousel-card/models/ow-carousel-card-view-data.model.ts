import { ViewData } from '../../../base/models/view-data.model';
import { ProductType } from '../../../../data/models/product-type.model';

export class OwCarouselCardViewData extends ViewData {
  constructor(
    public productTypes: ProductType[] = []
  )
  {
    super();
  }
}
