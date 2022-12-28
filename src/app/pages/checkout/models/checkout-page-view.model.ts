import { PageViewModel } from '../../../shares/base/models/page-view.model';
import { FormViewPageViewModel } from '../../../shares/base/models/form-view-page-view-model.model';
import { CartItem } from '../../../data/models/cart-item.model';
import { User } from '../../../data/models/user.model';
import { ItemBasic } from '../../../data/models/item-basic.model';
export class CheckoutPageViewModel extends FormViewPageViewModel {
  constructor(
    public cartId: string = "",
    public cartItems: CartItem[] = [],
    public userInfo: User = new User(),
    public cartItemsIds: string[] = [],
    public paymentMethods: ItemBasic[] = []
  ){
    super();
  }
}
