import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class RegisterMutation extends Mutation {
  override document = REGISTER_MUTATION;
}

export const REGISTER_MUTATION = gql`
  mutation($input: RegisterInput) {
    register(input: $input) {
      string
    }
  }
`
