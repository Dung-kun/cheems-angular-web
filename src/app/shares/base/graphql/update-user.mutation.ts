import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserMutation extends Mutation {
  override document = UPDATE_USER_MUTATION;
}

export const UPDATE_USER_MUTATION = gql`
  mutation ($input: UpdateUserInput) {
    updateUser(input: $input) {
      users {
        email
        phone
        address
        dob
        fullname
      }
    }
  }
`;
