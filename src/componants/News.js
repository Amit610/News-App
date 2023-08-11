import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, SetArticles] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [page, SetPage] = useState(1);
  const [totalResults, setTotalresults] = useState(0);

  const UpdateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=15e2c91b28524e4aa87f35cb8a0fdb47&page=${page}&pageSize=${props.pageSize}`;
    SetLoading(true);
    let data = await fetch(url);
    let parsdData = await data.json();
    SetArticles(parsdData.articles);
    SetLoading(false);
    setTotalresults(parsdData.totalResults);
  };

  useEffect(() => {
    UpdateNews();
  }, []);

  const handlePrevClick = async () => {
    SetPage(page - 1);
    UpdateNews();
  };
  const handleNextClick = async () => {
    SetPage(page + 1);
    UpdateNews();
  };

  return (
    <div>
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          News Flash - Top News{" "}
        </h1>
        {loading && <Spinner />}
        <div className="row">
          {!loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 55) : ""}
                    discription={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Prev
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
