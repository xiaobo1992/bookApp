import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks.js'
import AddBooks from './AddBooks.js'


class BooksApp extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      currentlyReading : [],
      wantToRead : [],
      read : [],
    };
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({
        currentlyReading : books.filter(book => book.shelf === "currentlyReading"),
        wantToRead:books.filter(book => book.shelf === "wantToRead"),
        read:books.filter(book => book.shelf === "read"),
      })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({
          currentlyReading : books.filter(book => book.shelf === "currentlyReading"),
          wantToRead:books.filter(book => book.shelf === "wantToRead"),
          read:books.filter(book => book.shelf === "read"),
        })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          (<div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <ListBooks title={"Currently Reading"} books={this.state.currentlyReading}
                updateShelf={this.updateShelf}/>
                <ListBooks title={"Want to Read"} books={this.state.wantToRead}
                updateShelf={this.updateShelf}/>
                <ListBooks title={"read"} books={this.state.read}
                updateShelf={this.updateShelf}/>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
        <Route exact path="/search" render={()=>
          <AddBooks updateShelf={this.updateShelf}/>
        }/>
      </div>
    )
  }
}

export default BooksApp
