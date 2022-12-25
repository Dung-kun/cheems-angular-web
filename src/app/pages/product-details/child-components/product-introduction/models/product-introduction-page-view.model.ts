import { PageViewModel } from '../../../../../shares/base/models/page-view.model';
import { ProductType } from '../../../../../data/models/product-type.model';
import { CartItem } from '../../../../../data/models/cart-item.model';
export class ProductIntroductionPageViewModel extends PageViewModel {
  constructor(
    public productType: ProductType = new ProductType(),
    public showDialog: boolean = false,
    public cartItem: CartItem = new CartItem()
  ){
    super()
  }
}
