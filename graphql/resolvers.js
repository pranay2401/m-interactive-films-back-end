const { v4: uuidv4 } = require('uuid');
const _isEmpty = require('lodash/isEmpty');
const fetch = require("node-fetch");
const { database, firebaseClient } = require("../services/firebase");
const userProfile = require("./mapping/userProfile");
const movie = require('./mapping/movie');

const baseDBURL =
  process.env.NODE_ENV === "production"
    ? process.env.FB_PROD_DB_URL
    : process.env.FB_DEV_DB_URL;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,

    user: async (_, { uid }) => {
      const data = await fetch(`${baseDBURL}/users/${uid}.json`);
      const dataJson = await data.json();
      return dataJson;
    },

    users: async () => {
      const data = await fetch(`${baseDBURL}/users.json`);
      const dataJson = await data.json();
      const keys = Object.keys(dataJson);
      const mapsKeys = keys.map(function (item) {
        const userData = dataJson[item];
        const graphqlUser = userProfile(userData);
        return graphqlUser;
      });
      return mapsKeys;
    },

    movies: async () => {
      const data = await fetch(`${baseDBURL}/movies.json`);
      const dataJson = await data.json();
      const keys = Object.keys(dataJson);
      const mapsKeys = keys.map(function (item) {
        const movieData = dataJson[item];
        const graphqlMovie = movie(movieData);
        return graphqlMovie;
      });
      return mapsKeys;
    },

    movie: async (_, { mId }) => {
      const data = await fetch(`${baseDBURL}/movies/${mId}.json`);
      const dataJson = await data.json();
      return dataJson;
    }
  },

  Mutation: {
    createUser: async (parent, data, { models }) => {
      // TODO : if email exists, then don't create 
      if (!data) {
        return "No data provided";
      }


      let uid = data.uid;

      if (_isEmpty(uid)) {
        uid = uuidv4();
        data.uid = uid
      }

      // TODO: return data
      firebaseClient
        .database()
        .ref("users/" + data.uid)
        .set(data);
    },

    addMovie: async (parent, data, { models }) => {
      if (!data) {
        return "No data provided";
      }

      let mId = data.mId;

      if (_isEmpty(mId)) {
        mId = uuidv4();
        data.mId = mId;
      }

      firebaseClient
        .database()
        .ref("movies/" + mId)
        .set(JSON.parse(JSON.stringify(data)));
    }

  },
};

module.exports = resolvers;
