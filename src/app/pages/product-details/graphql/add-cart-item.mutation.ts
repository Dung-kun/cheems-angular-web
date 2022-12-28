import { Injectable } from '@angular/core';
import { Query, TypedDocumentNode, Mutation } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AddCartItemMutation extends Mutation {
  override document: DocumentNode | TypedDocumentNode<{}, EmptyObject> = ADD_CART_ITEM_MUTATION;
}

export const ADD_CART_ITEM_MUTATION = gql`
  mutation ($input: AddCartItemInput) {
    addCartItem(input: $input) {
      cartItems {
        id
      }
    }
  }
`;
