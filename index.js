const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { GraphQLServer } = require("graphql-yoga");
const firebaseClient = require("./services/firebase");
require("dotenv").config();

const port = process.env.PORT || 4001;
const index = require("./routes/index");

// graphql
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const gqlserver = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      // headers: req.headers,
      firebaseClient,
    };
  },
});
gqlserver.start(() =>
  console.log(`GraphQL Server is running on localhost:4000`)
);

const app = express();
app.use(index);

// Socket.io example starts >>>>>>
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
}); // < Interesting!

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
// <<<<<<< Socket.io example ends

server.listen(4002, () => console.log(`Listening on port ${4002}`));
