import { PageViewModel } from '../../../../../shares/base/models/page-view.model';
import { ProductType } from '../../../../../data/models/product-type.model';


export class NewProductViewModel extends PageViewModel {
  constructor(
    public newProductTypes: ProductType[] = [],
  ){
    super()
  }
}
