import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../../../../data/models/cart-item.model';

@Pipe({
  name: 'priceShow',
})
export class PriceShowPipe implements PipeTransform {
  transform(cartItems: CartItem[], title: string, formCheck?: boolean[]): number {
    const totalDiscounted = cartItems.reduce((value, item, index) => {
      if(!!formCheck && !formCheck[index]) return value;
      return (
        value +
        item.amount *
          item.productTypes[0].price *
          (1 - (item.productTypes[0]?.discountPercentage || 0))
      );
    }, 0);

    const total = cartItems.reduce((value, item, index) => {
      if(!!formCheck && !formCheck[index]) return value;
      return value + item.amount * item.productTypes[0].price;
    }, 0);

    const VAT = !!formCheck? 0: totalDiscounted * 0.08;

    if (title == 'total') return total;
    else if (title == 'discount') return total - totalDiscounted;
    else if (title == 'VAT') return VAT;

    return totalDiscounted + VAT;
  }
}
