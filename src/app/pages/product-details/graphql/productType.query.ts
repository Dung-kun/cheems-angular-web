import { Injectable } from '@angular/core';
import { Query, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeQuery extends Query {
  override document: DocumentNode | TypedDocumentNode<{}, EmptyObject> =  PRODUCT_TYPE_QUERY;
}

export const PRODUCT_TYPE_QUERY = gql`
query($input: ProductTypesFilterInput) {
  productTypes(input: $input) {
    items {
      id
      name
      description
      warrantyPeriod
      totalAmount
      price
      medias {
          id
          filePath
          fileType
          fileSize
      }
      categories {
        id
        name
        description
      }
      metaDatas {
        id
        manufacturers {
          id
          name
          description
        }
        seriesName
        audio
        battery
        screenResolution
        operatingSystem
        camera
        color
        cPUSeries
        gPUSeries
        dimensions
        hardDrive
        ports
        ram
        weight
        wLAN
        publishedDate
      }
      description
    }
  }
}
`
