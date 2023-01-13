import { PaginationPageViewModel } from '../../../shares/base/models/pagination-page-view.model';
import { CartItem } from '../../../data/models/cart-item.model';



export class ShoppingCartPageViewModel extends PaginationPageViewModel {
  constructor(
    public checkAmountChanged: boolean[] = [],
    public cartItems: CartItem[] = [],
    public cartId: string  ="",
    public cartItemId: string = ""
  ) {
    super();
  }
}
