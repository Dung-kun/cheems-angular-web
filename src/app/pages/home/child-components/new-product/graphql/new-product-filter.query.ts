import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class NewProductFilterQuery extends Query {
  override document = NEW_PRODUCT_QUERY;
}


export const NEW_PRODUCT_QUERY =  gql`
query ($input: ProductTypesFilterInput, $skip: Int, $take: Int) {
  productTypes(input: $input, skip: $skip, take: $take) {
    items {
      id
      name
      description
      warrentyDate
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
