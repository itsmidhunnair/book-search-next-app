const { gql } = require("@apollo/client");

const searchBooks = gql`
  query fetchSearchedBooks($input: BooksInput) {
    books(input: $input) {
      id
      saleInfo {
        listPrice {
          amount
          currencyCode
        }
      }
      volumeInfo {
        authors
        averageRating
        description
        imageLinks {
          thumbnail
        }
        pageCount
        publishedDate
        publisher
        ratingsCount
        subtitle
        title
      }
    }
  }
`;

const book = gql`
  query Book($bookId: ID!) {
    book(id: $bookId) {
      id
      saleInfo {
        listPrice {
          amount
          currencyCode
        }
      }
      volumeInfo {
        authors
        averageRating
        description
        imageLinks {
          thumbnail
        }
        pageCount
        publishedDate
        publisher
        ratingsCount
        subtitle
        title
      }
    }
  }
`;

export { searchBooks, book };
