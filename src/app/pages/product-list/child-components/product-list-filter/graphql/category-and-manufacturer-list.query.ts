import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoryAndManufacturerListQuery extends Query {
  override document = CATEGORY_AND_MANUFACTURER_LIST_QUERY;
}

export const CATEGORY_AND_MANUFACTURER_LIST_QUERY = gql`
  query ($input: CategoriesFilterInput, $input2: ManufacturersFilterInput) {
    categories(input: $input) {
      items {
        id
        name
      }
    }

    manufacturers(input: $input2) {
      items {
        id
        name
      }
    }
  }
`;
