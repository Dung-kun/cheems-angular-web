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
query ($input: ProductTypesFilterInput, $skip: Int, $take: Int) {
  productTypes(input: $input, skip: $skip, take: $take) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
    items {
      id
      name
      description
      warrantyPeriod
      price
      medias {
        id
        filePath
        fileType
        fileSize
      }
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
