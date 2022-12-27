import { PageViewModel } from '../../../base/models/page-view.model';
import { CartItem } from '../../../../data/models/cart-item.model';
export class CartCardPageVIewModel extends PageViewModel {
  constructor(
    public cartItem : CartItem = new CartItem()
  ){
    super();
  }
}
