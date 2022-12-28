import { Query, Mutation } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CartItemUpdateMutation extends Mutation {
  override document = CART_ITEM_UPDATE;
}

export const CART_ITEM_UPDATE = gql`
  mutation ($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      cartItems {
        id
      }
    }
  }
`;
