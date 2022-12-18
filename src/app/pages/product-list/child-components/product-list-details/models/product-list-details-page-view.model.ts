import { PaginationPageViewModel } from '../../../../../shares/base/models/pagination-page-view.model';
import { ProductType } from '../../../../../data/models/product-type.model';
import { PageInfo } from '../../../../../data/models/page-info.model';

export class ProductListDetailsPageViewModel extends PaginationPageViewModel {
  constructor(
    public productList: ProductType[] = [],
    public paginationIdx: string = "",
    public pageInfo: PageInfo = new PageInfo()
  ){
    super();
  }
}
