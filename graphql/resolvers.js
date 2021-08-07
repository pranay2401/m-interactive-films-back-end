const { v4: uuidv4 } = require("uuid");
const _isEmpty = require("lodash/isEmpty");
const fetch = require("node-fetch");
const { database, firebaseClient } = require("../services/firebase");
const userProfile = require("./mapping/userProfile");
const movie = require("./mapping/movie");

const baseDBURL =
  process.env.NODE_ENV === "production"
    ? process.env.FB_PROD_DB_URL
    : process.env.FB_DEV_DB_URL;

const firebaseDB = firebaseClient.database();

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,

    user: async (_, { uid }) => {
      const data = await fetch(`${baseDBURL}/users/${uid}.json`);
      const dataJson = await data.json();
      return userProfile(dataJson);
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
      if (!data) {
        return "No data provided";
      }

      let uid = data.uid;
      if (_isEmpty(uid)) {
        uid = uuidv4();
        data.uid = uid
      }
      
      let writeResult
      await firebaseDB.ref("users/" + uid)
        .set(data, (error) => {
          if (error) {
            writeResult = error;
          } else {
            writeResult = data;
          }
        });
        return data;
    },

    addMovie: async (parent, data, { models }) => {
      if (!data) {
        return "No data provided";
      }

      const id = uuidv4();
      data.id = id;

      let writeResult
      await firebaseDB.ref("movies/" + id)
      .set(JSON.parse(JSON.stringify(data)), (error) => {
        if (error) {
          writeResult = error;
        } else {
          writeResult = data;
        }
      });
      
      const editorId = data.editorId;
      let editorListRef = firebaseDB.ref('users/' + editorId + '/editedMovies');
      editorListRef.push(id);
      
      return data;
    }
  },
};

module.exports = resolvers;
