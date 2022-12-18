import { ProductType } from '../../../data/models/product-type.model';
export class ProductDetailsResult {
  constructor(
    public productType: ProductType = null
  ) {

  }
}
