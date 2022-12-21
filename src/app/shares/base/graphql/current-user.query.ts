import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserQuery extends Query {
  override document = CURRENT_QUERY;
}

export const CURRENT_QUERY = gql`
  query {
    currentUsers {
      phone
      id
      dob
      status
      fullname
      email
      roles {
        id
        description
        name
      }
      address
      password
      medias {
        id
        filePath
      }
    }
  }
`;
