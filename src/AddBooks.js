import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import PropTypes from 'prop-types';

class AddBooks extends Component {

  state = {
    books : [],
    query : "",
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    BooksAPI.search(this.state.query, 20).then((books) => {
      if (books) {
        this.setState({books:books})
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
            value={this.props.query}
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
