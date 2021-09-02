const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Coin {
    _id: ID
    name: String
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

  type Query {
    coins: [Coin]
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
