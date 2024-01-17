const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book] @connection(key: "Book")
    bookCount: Int
}

type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

Auth {
    token: ID!
    user: User
}

type Query {
    me(_id: ID!): User
    books(bookId: String!): [Book]
}

type Mutations
    AddUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
    removeBook(bookId: String!): User
`

module.exports = typeDefs;