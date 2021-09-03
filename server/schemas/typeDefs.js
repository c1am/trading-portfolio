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
    coins: [Coin]
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
    coins: [Coin]
    checkout(coins: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    buyCoins(symbol: String, name: String, price: Float, qty: Int, date: Date, user: ID): Coin
    updateCoins(_id: ID!, quantity: Int!): Coin
  }
`;

module.exports = typeDefs;
