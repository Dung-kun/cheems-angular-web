import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ManufacturersQuery extends Query {
  override document = MANUFACTURERS_QUERY;
}

export const MANUFACTURERS_QUERY = gql`
  query ($input: ManufacturersFilterInput, $skip: Int, $take: Int) {
    manufacturers(input: $input, skip: $skip, take: $take) {
      items {
        id
        name
      }
    }
  }
`;
