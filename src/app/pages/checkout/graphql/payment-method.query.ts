import { Query } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodQuery extends Query {
  override document = PAYMENT_METHOD_QUERY;
}

export const PAYMENT_METHOD_QUERY = gql`
  query ($input: PaymentMethodsFilterInput) {
    paymentMethods(input: $input) {
      items {
        id
        name
      }
    }
  }
`;
