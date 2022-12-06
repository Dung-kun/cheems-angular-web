import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductListQuery extends Query {
  override document = PRODUCT_LIST_QUERY;
}


export const PRODUCT_LIST_QUERY =  gql`
  query($input: ProductTypesFilterInput) {
    productTypes(input: $input) {
      nodes {
        name
        description
      }
      totalCount
    }
  }
`
