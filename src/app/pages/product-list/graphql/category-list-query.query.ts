import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoryListQuery extends Query {
  override document = CATEGORY_LIST_QUERY;
}

export const CATEGORY_LIST_QUERY = gql`
  query($input: CategoriesFilterInput) {
    categories {
      nodes {
        id
        name
        description
      }
    }
  }
`
