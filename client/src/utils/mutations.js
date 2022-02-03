import { gql } from '@apollo/client';

export const LOGIN_ACCOUNT = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      account {
        _id
        email
      }
    }
  }
`;

export const ADD_ACCOUNT = gql`
  mutation addAccount($email: String!, $password: String!) {
    addAccount(email: $email, password: $password) {
      token
      account {
        _id
        email
      }
    }
  }
`;

export const ADD_TO_CART = gql `
mutation AddToCart($productId: String, $accountId: String) {
  addToCart(productId: $productId, accountId: $accountId) {
    email
  }
}
`;