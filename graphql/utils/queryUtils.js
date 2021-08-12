const _isEmpty = require("lodash/isEmpty");

const filterMovies = (movie, params) => {
  let result = true;

  if (!params) {
    return result;
  }

  if (!_isEmpty(params.queryText) && !_isEmpty(movie)) {
    result =
      result &&
      movie.title.toLowerCase().includes(params.queryText.toLowerCase());
  }

  if (Object.keys(params).includes("isPublished")) {
    result = result && movie.isPublished === params.isPublished;
  }

  if (Object.keys(params).includes("isFeatured")) {
    result = result && movie.isFeatured === params.isFeatured;
  }


  return result;
};

module.exports = { filterMovies };
