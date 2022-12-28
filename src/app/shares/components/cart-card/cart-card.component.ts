import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CartItem } from '../../../data/models/cart-item.model';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() changeAmountProduct = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    console.log(this.cartItem);
  }

  changeAmount(value: number) {
    this.changeAmountProduct.emit({
      amount: value,
      cardItemId: this.cartItem.id
    });
  }


}
