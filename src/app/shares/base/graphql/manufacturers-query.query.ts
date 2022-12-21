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
  query ($input: CategoriesFilterInput) {
    manufacturers(input: $input) {
      items {
        id
        name
      }
    }
  }
`;
