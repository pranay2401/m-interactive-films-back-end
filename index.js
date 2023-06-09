// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
const { GraphQLServer } = require("graphql-yoga");
const firebaseClient = require("./services/firebase");
require("dotenv").config();

const port = process.env.PORT || 4001;
// const index = require("./routes/index");

// graphql
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      // headers: req.headers,
      firebaseClient,
    };
  },
});

const options = {
  port,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
};

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);

// const app = express();
// app.use(index);

// // Socket.io example starts >>>>>>
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// }); // < Interesting!

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };
// // <<<<<<< Socket.io example ends

// server.listen(port, () => console.log(`Listening on port ${port}`));
