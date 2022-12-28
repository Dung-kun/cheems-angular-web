import gql from 'graphql-tag';

export const GET_PERSONAL_ORDERS = gql`
  query($input: OrdersFilterInput, $skip: Int, $take: Int) {
	orders(input: $input, skip: $skip, take: $take) {
		items {
			id,
			status,
			addressFrom,
			addressTo,
			receiptsId,
      receipts {
        totalPrice
        receiptDetails {
          id
          amount
          price
          products {
            productTypes {
              name
              medias {
                id
                filePath
              }
            }
          }
        }
        payments {
          id
          customerPayments {
            id
            paymentMethods {
              id
              name
              currency
            }
          }
        }
      }
      users {
        id
        fullname
        email
        phone
      }
			deletedAt
		},
		pageInfo {
			hasNextPage,
			hasPreviousPage
		},
		totalCount
	}
}
`
