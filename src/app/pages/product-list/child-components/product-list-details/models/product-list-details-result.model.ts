import { ProductType } from '../../../../../data/models/product-type.model';
import { PageInfo } from '../../../../../data/models/page-info.model';
export class ProductListDetailsResult {
  constructor(
    public productList: ProductType[] = [],
    public pageInfo: PageInfo = new PageInfo(),
    public totalCount: number = 0
  ){
  }
}
