import { ProductTypeFilterInput } from '../../../data/models/product-type-filter-input.model';
export class FilterProductModel  {
  constructor(
    public productTypeFilterInput: ProductTypeFilterInput = new ProductTypeFilterInput()
  ) {

  }
}
