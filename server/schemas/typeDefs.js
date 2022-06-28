// import the gql template
const { gql } = require('apollo-server-express');

// create the typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input SavedBook {
        authors: [String]
        description: String
        bookId: String
        title: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBook): User
        removeBook(bookId: String!): User
    }
`;

// export typeDefs
module.exports = typeDefs;
