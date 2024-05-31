const typeDefs =`
type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [
    Book
  ]
}

type Book {
  bookId: ID!
  authors: [
    String
  ]
  descripion: String!
  title: String!
  image: String
  link: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
}

type Mutation {
  login( email: String!, password: String! ): Auth
  addUser( username: String!, email: String!, password: String! ): Auth
  savebook(
    bookId: ID!
    authors: [
      String
    ]
    descripion: String!
    title: String!
    image: String
    link: String
  ) :User
  removeBook( bookId: ID! ): User
}`

module.exports = typeDefs;