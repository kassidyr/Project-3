// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(book: BookInput!): User
  removeBook(bookId: ID!): User
}

type Query {
  me: User!
}

input BookInput {
  authors: [String!]
  description: String!
  image: String
  link: String
  bookId: ID!
  title: String!
}

type User {
  _id: ID!
  username: String!
  email: String!
  bookCount: Int!
  savedBooks: [Book!]
}

type Book {
  bookId: String!
  authors: [String]
  description: String!
  title: String!
  image: String
  link: String
}

type Auth {
  token: String!
  user: User!
}
`;

// export the typeDefs
module.exports = typeDefs;