import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { ProductType } from '../../../data/models/product-type.model';
import { PaginationPageViewModel } from '../../../shares/base/models/pagination-page-view.model';


export class ShoppingCartPageViewModel extends PaginationPageViewModel {
  constructor(
    public productTypes: ProductType[] = []
  ) {
    super();
  }
}
