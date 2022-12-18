import { PageViewModel } from '../../../../../shares/base/models/page-view.model';
import { ItemBasic } from '../../../../../data/models/item-basic.model';
import { ProductType } from '../../../../../data/models/product-type.model';
export class ProductDescriptionPageViewModel extends PageViewModel {
  constructor(
    public productType: ProductType = null,
    public generalInformation: ItemBasic[] = [],
    public detailedConfiguration: ItemBasic[] = []
  ){
    super()
  }
}
