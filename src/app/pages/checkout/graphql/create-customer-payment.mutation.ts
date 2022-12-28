import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateCustomerPaymentMutation extends Mutation {
  override document = CREATE_CUSTOMER_PAYMENT_MUTATION;
}

export const CREATE_CUSTOMER_PAYMENT_MUTATION = gql`
  mutation ($input: CreateCustomerPaymentInput) {
    createCustomerPayment(input: $input) {
      customerPayments {
        id
        address
        paymentMethods {
          id
          name
        }
      }
    }
  }
`;
