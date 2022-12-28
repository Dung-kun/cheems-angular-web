import { PaginationPageViewModel } from '../../../shares/base/models/pagination-page-view.model';
import { CartItem } from '../../../data/models/cart-item.model';
import { PageInfo } from '../../../data/models/page-info.model';
import { FormArray } from '@angular/forms';


export class ShoppingCartPageViewModel extends PaginationPageViewModel {
  constructor(
    public checkAmountChanged: boolean[] = [],
    public cartItems: CartItem[] = [],
    public cartId: string  =""
  ) {
    super();
  }
}
