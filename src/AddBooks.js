import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import PropTypes from 'prop-types';

class AddBooks extends Component {

  state = {
    books : [],
  }

  updateQuery = (query) => {
    if (query.trim().length === 0) {
      this.setState({books:[]})
      return;
    }

    BooksAPI.search(query.trim(), 20).then((books) => {
      if (books && books.error === undefined) {
        this.setState({books:books})
      } else {
        this.setState({books:[]})
      }
    })

  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            onChange={event => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books.map((book) =>
            <Book book={book}
            key={book.id}
            updateShelf={this.props.updateShelf}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

AddBooks.propTypes = {
  updateShelf:PropTypes.func.isRequired
}
export default AddBooks
