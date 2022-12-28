import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyShowPipe implements PipeTransform {

  transform(value: number): unknown {
    const styleMoney = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return styleMoney.format(value);
  }

}
