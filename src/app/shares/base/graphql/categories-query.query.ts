import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoriesQuery extends Query {
  override document = CATEGORIES_QUERY;
}

export const CATEGORIES_QUERY = gql`
  query ($input: CategoriesFilterInput, $skip: Int, $take: Int) {
    categories(input: $input, skip: $skip, take: $take) {
      items {
        id
        name
      }
    }
  }
`;
