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
        }
        payments {
          id
          customerPayments {
            id
            paymentMethods {
              id
              name
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
