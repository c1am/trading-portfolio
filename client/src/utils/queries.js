import { gql } from '@apollo/client';

export const QUERY_STOCKS = gql`
  {
    stocks {
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
           stocks {
               name
           }
        }
    }
`;
