import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LoginQuery extends Query {
  override document = LOGIN_QUERY;
}

export const LOGIN_QUERY = gql`
  query($input: UserAuthenticationInput) {
    login(input: $input) {
      string
    }
  }
`
