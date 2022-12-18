import { ViewData } from '../../../../../shares/base/models/view-data.model';
import { ProductTypeFilterInput } from '../../../../../data/models/product-type-filter-input.model';


export class ProductListDetailsViewData extends ViewData {
  constructor(
    public productTypeFilterInput: ProductTypeFilterInput = new ProductTypeFilterInput()
  ){
    super();
  }
}
