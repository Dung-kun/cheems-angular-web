import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductListFilterQuery extends Query {
  override document = PRODUCT_LIST_FILTER_QUERY;
}


export const PRODUCT_LIST_FILTER_QUERY =  gql`
  query($input: ProductTypesFilterInput, $first: Int, $after: String, $last: Int, $before: String) {
    productTypes(input: $input,first: $first, after: $after, before: $before, last: $last) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        name
        description
        warrentyDate
        price
        metaDatas {
          id
          manufacturers {
            id
            name
            description
          }
          seriesName
          battery
          screenResolution
          cPUSeries
          gPUSeries
          dimensions
          hardDrive
          ram
        }
      }
    }
  }
`
