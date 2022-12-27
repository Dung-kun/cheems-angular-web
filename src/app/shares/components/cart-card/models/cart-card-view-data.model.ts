import { ViewData } from '../../../base/models/view-data.model';
import { CartItem } from '../../../../data/models/cart-item.model';
export class CartCardViewData extends ViewData {
  constructor(
    cartItem: CartItem = new CartItem()
  ){
    super();
  }
}
