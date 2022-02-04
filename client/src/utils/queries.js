import { gql } from '@apollo/client';



export const GET_ACCOUNT = gql`
    query getAccount($accountId: ID) {
        getAccount(accountId: $accountId) {
            _id
            cart {
                _id
                description
                name
                imageURL
                price
            }
        }
    }
`

export const CREATE_CHECKOUT = gql`
    query createCheckout($accountId: ID) {
      createCheckout(accountId: $accountId)
    }
  `
 
export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
        getAllProducts {
            _id
            name
            description
            imageURL
            price
            productId
            priceId
        }
    }
  `