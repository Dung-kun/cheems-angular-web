import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { FormViewPageViewModel } from '../../../shares/base/models/form-view-page-view-model.model';
import { CartItem } from '../../../data/models/cart-item.model';
import { User } from '../../../data/models/user.model';
export class CheckoutPageViewModel extends FormViewPageViewModel {
  constructor(
    public cartId: string = "",
    public cartItems: CartItem[] = [],
    public userInfo: User = new User()
  ){
    super();
  }
}
