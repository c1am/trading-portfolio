const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  type Coin {
    _id: ID!
    symbol: String!
    name: String!
    price: Float!
    qty: Int
    date: Date!
    user: User!
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    coins: Coin
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    buyCoins(symbol: String, name: String, price: Float, qty: Int, date: Date, user: ID): Coin
  }
`;

module.exports = typeDefs;
