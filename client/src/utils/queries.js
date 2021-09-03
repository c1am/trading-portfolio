import { gql } from '@apollo/client';

export const QUERY_COINS = gql`
  query coins {
    coins {
      name
      price
      symbol
      qty
    }
  }
`;

export const QUERY_USER = gql` 
    query user {
        user{
            _id
           firstName
           lastName
           email
        }
    }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($coins: [ID]!) {
    checkout(coins: $coins) {
      session
    }
  }
`;