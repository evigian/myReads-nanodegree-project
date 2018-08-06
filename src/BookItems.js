import React, { Component } from "react";
import noBookCover from "./icons/no_book_cover.jpg";

class BookItems extends Component {
  render() {
    let bookCover = this.props.book.imageLinks
      ? this.props.book.imageLinks.thumbnail
      : noBookCover;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookCover}")`
            }}
          />

          <div className="book-shelf-changer">
            <select
              value={this.props.bookShelf}
              onChange={evt =>
                this.props.changeShelf(this.props.book, evt.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-info">
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors ? this.props.book.authors.join(", ") : ""}
          </div>
          <div className="book-date">
            Published: {this.props.book.publishedDate}
          </div>
        </div>
      </div>
    );
  }
}

export default BookItems;
