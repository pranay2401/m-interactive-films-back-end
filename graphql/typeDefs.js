const typeDefs = `
  type User {
    uid: String
    displayName: String
    email: String
    photoURL: String
    emailVerified: Boolean
  }
  type Query {
    hello(name: String): String!,
    user(uid: String!): User
    users:[User]
  }
  type Mutation {
    createUser(uid: String, displayName: String, email: String, photoURL: String, emailVerified: Boolean): User
  }
`;

module.exports = typeDefs;
