import { Query } from 'apollo-angular';
import gql from 'graphql-tag';


export class ProductTypeQuery extends Query {
  override document =  PRODUCT_TYPE_QUERY;
}

export const PRODUCT_TYPE_QUERY = gql`
query($input: ProductTypesFilterInput) {
  productTypes(input: $input) {
    nodes {
      id
      name
      medias {
          id
          filePath
          fileType
          fileSize
      }
      description
      warrentyDate
      price
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
