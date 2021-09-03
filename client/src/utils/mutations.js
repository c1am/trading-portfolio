import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
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

export const BUY_COINS = gql`
  mutation buyCoins(
    $symbol: String!
    $name: String!
    $price: Float!
    $qty: Int!
    $date: Date!
    $user: ID!
    ) {
      buyCoins (
      symbol: $symbol
      name: $name
      price: $price
      qty: $qty
      date: $date
      user: $user
    ) {
        _id
        symbol
        name
        price
        qty
        date
        user {
          _id
        }
    }
  }
`;
