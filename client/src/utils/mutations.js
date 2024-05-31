import {gql} from '@apollo/client'

export const LOGIN = gql`mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}`

export const ADD_USER = gql`mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}`

export const SAVE_BOOK = gql`mutation Savebook($bookId: ID!, $descripion: String!, $title: String!, $authors: [String], $image: String, $link: String) {
  savebook(bookId: $bookId, descripion: $descripion, title: $title, authors: $authors, image: $image, link: $link) {
    _id
    bookCount
    email
    savedBooks {
      bookId
      authors
      descripion
      title
      image
      link
    }
    username
  }
}`

export const REMOVE_BOOK = gql`mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      descripion
      title
      image
      link
    }
  }
}`