const firebase = require("firebase");
require("dotenv").config();

const firebaseDevConfig = {
  apiKey: process.env.FB_DEV_API_KEY,
  authDomain: process.env.FB_DEV_AUTH_DOMAIN,
  databaseURL: process.env.FB_DEV_DB_URL,
  projectId: process.env.FB_DEV_PROJECT_ID,
  storageBucket: process.env.FB_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_DEV_MESSAGING_SENDER_ID,
  appId: process.env.FB_DEV_APP_ID,
  measurementId: process.env.FB_DEV_MEASUREMENT_ID,
};

const firebaseProdConfig = {
  apiKey: process.env.FB_PROD_API_KEY,
  authDomain: process.env.FB_PROD_AUTH_DOMAIN,
  databaseURL: process.env.FB_PROD_DB_URL,
  projectId: process.env.FB_PROD_PROJECT_ID,
  storageBucket: process.env.FB_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_PROD_MESSAGING_SENDER_ID,
  appId: process.env.FB_PROD_APP_ID,
  measurementId: process.env.FB_PROD_MEASUREMENT_ID,
};

const firebaseConfig =
  process.env.NODE_ENV !== "production"
    ? firebaseDevConfig
    : firebaseProdConfig;

const firebaseClient = firebase.initializeApp(firebaseConfig);

const database = firebase.database();

module.exports = { firebaseClient, database };
