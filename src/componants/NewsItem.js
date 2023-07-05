import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, discription, imgurl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div
          className="card hover-shadow bg-image hover-zoom bg-dark "
          style={{ height: "500px", color: "white" }}
        >
          <img src={imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text">
              <small className="text-body-primery">
                By {!author ? "Unkown" : author} on {Date(date).toString()}
                From {!source ? "Unkown" : source}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
