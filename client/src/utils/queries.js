import { gql } from '@apollo/client';

export const QUERY_STOCKS = gql`
  {
    stocks {
      _id
      name
    }
  }
`;
