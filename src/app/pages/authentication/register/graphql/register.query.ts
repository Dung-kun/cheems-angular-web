import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class RegisterQuery extends Query {
  override document = REGISTER_QUERY;
}

export const REGISTER_QUERY = gql`
  query($input: UserAuthenticationInput) {
    login(input: $input) {
    }
  }
`
