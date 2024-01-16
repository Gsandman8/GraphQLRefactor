const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [String]
}

type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: User
    books(bookId: String!): [Book]
}

type Mutations

`