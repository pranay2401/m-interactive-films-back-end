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

const getMovies = async (movieIds, firebaseDB) => {
  let res = [];
  let promsies = [];
  for (const movieId of movieIds) {
    let movieRef = firebaseDB.ref("movies").child(`${movieId}`);
    promsies.push(
      movieRef.once("value").then((snapshot) => {
        if (snapshot.empty) {
          console.log(`Movie with id: ${movieId} not found`);
          return;
        }
        movie = snapshot.val();
        res.push(movie);
      })
    );
  }
  await Promise.all(promsies);
  return res;
};

module.exports = { filterMovies, getMovies };
