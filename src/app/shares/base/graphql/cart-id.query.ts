import { Injectable } from '@angular/core';
import { Query, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CartIdQuery extends Query {
  override document: DocumentNode | TypedDocumentNode<{}, EmptyObject> = CART_ID_QUERY;
}

export const CART_ID_QUERY = gql`
  query ($input: CartsFilterInput) {
    carts(input: $input) {
      items {
        id
      }
    }
  }
`;
