import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    book: this.props.book
  }

  componentWillMount() {
      this.setState({book : this.props.book})
      BooksAPI.get(this.props.book.id).then((book) =>{
        if (book) {
          this.setState({book: book})
        }
      })
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    this.setState({book, book})
    this.props.updateShelf(book, shelf)
  }

  render() {
    const imageUrl = this.state.book.imageLinks? this.state.book.imageLinks.thumbnail
      : "http://via.placeholder.com/128x193?text=No%20Cover";
    return(
      <div className="book" >
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url(${imageUrl})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.book.shelf}
            onChange={event=>this.updateBook(this.state.book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.state.book.title}</div>
        <div className="book-authors">
          {this.state.book.authors ? this.state.book.authors.join(', ') : ''}
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Book
