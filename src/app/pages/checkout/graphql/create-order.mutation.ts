import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderMutation extends Mutation {
  override document = CREATE_ORDER_MUTATION;
}

export const CREATE_ORDER_MUTATION = gql`
  mutation ($input: CreateOrderInput) {
    createOrder(input: $input) {
      orders {
        id
        usersId
      }
    }
  }
`;
