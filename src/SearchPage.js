import React, { Component } from "react";
import BookItems from "./BookItems";
import { Link } from "react-router-dom";
//import escapeRegExp from 'escape-string-regexp'
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class SearchPage extends Component {
  static propTypes = {
    //when I write 'static propTypes' I have warnings on the console and don't know what to do although I researched about it
    //when I write a different word like properTypes there's no warning!
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    query: "",
    results: [],
    input: ""
  };

  updateQuery = query => {
    this.setState({
      query: query,
      input: ""
    });
    this.updateBooks(query);
  };

  updateBooks = query => {
    if (query) {
      BooksAPI.search(query)
        .then(results => {
          this.setState({ results });
        })
        .catch(error => console.log(error));
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}

            <form onSubmit={event => event.preventDefault()}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={evt => this.updateQuery(evt.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 &&
              this.state.results &&
              this.state.results.length > 0 &&
              this.state.results.map(result => {
                let chosenShelf = "none";

                this.props.books.map(
                  book =>
                    book.id === result.id ? (chosenShelf = book.shelf) : ""
                );

                return (
                  <li key={result.id}>
                    <BookItems
                      book={result}
                      changeShelf={this.props.changeShelf}
                      bookShelf={chosenShelf}
                    />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
