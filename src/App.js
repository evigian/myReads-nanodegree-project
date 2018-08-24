import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookShelves from "./BookShelves";
import SearchPage from "./SearchPage";
import "./App.css";

class App extends React.Component {
  static propTypes = {
    //when I write 'static propTypes' I have warnings on the console and don't know what to do although I researched about it
    books: PropTypes.array.isRequired // I have the following warning: Warning: Failed prop type: The prop `books` is marked as required in `App`, but its value is `undefined`.
    //in App (at index.js:8)
  };

  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(error => console.log(error));
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll().then(books => this.setState({ books }));
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="https://evigian.github.io/myReads-nanodegree-project/"
          render={() => (
            <BookShelves
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />

        <Route
          path="https://evigian.github.io/myReads-nanodegree-project/search"
          render={() => (
            <SearchPage
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
