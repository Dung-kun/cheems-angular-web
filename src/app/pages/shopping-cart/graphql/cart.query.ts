import { Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CartQuery extends Query {
  override document = CART_QUERY;
}

export const CART_QUERY = gql`
  query ($input: CartsFilterInput) {
    carts(input: $input) {
      items {
        id
        cartItems {
          id
          amount
          productTypes {
            id
            name
            totalAmount
            price
            warrantyPeriod
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
  }
`;
