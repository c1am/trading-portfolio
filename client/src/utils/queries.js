import { gql } from '@apollo/client';

export const QUERY_COINS = gql`
  {
    coins {
      _id
      name
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
           coins {
              name
           }
        }
    }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($coin: [ID]!) {
    checkout(coin: $coin) {
      session
    }
  }
`;