import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const UPDATE_COIN = gql`
  mutation updateCoin(
    $symbol: String!
    $price: Float
    ) {
    updateCoin (
      symbol: $symbol
      price: $price
    )
  }
`;

// export const UPDATE_COINS = gql`
//   mutation updateCoins(
//     $input: [coins]
//   ) {
//     updateCoins(
//       input: $input
//     ) {
//       symbol: String
//       price: Float
//     }
//   }
// `;