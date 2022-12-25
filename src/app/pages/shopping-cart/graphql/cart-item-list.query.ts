import { Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CartItemListQuery extends Query {
  override document = CART_ITEM_LIST_QUERY;
}

export const CART_ITEM_LIST_QUERY = gql`
  query ($input: CartItemsFilterInput, $skip: Int, $take: Int) {
    cartItems(input: $input, skip: $skip, take: $take) {
      items {
        id
        amount
        productTypes {
          id
          metaDatas {
            id
            color
            cPUSeries
            seriesName
            gPUSeries
            manufacturers {
              id
              name
            }
          }
          medias {
            id
            filePath
          }

          categories {
            id
            name
          }
        }
      }
    }
  }
`;
