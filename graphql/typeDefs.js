const { GraphQLJSONObject } = require("graphql-type-json");

const typeDefs = `
  scalar GraphQLJSONObject

  type User {
    uid: ID
    displayName: String
    email: String
    photoURL: String
    emailVerified: Boolean,
    watchlistedMovies: [String]
  }

  type Thumbnail {
    url: String,
    height: Int,
    width: Int
  }

  input InputThumbnail {
    url: String,
    height: Int,
    width: Int
  }

  type Thumbnails {
    default: Thumbnail,    
    medium: Thumbnail,    
    high: Thumbnail,    
    standard: Thumbnail,    
    maxres: Thumbnail,
    userThumbnail: Thumbnail,    
    userBackground: Thumbnail    
  }

  input InputThumbnails {
    default: InputThumbnail,    
    medium: InputThumbnail,    
    high: InputThumbnail,    
    standard: InputThumbnail,    
    maxres: InputThumbnail,
    userThumbnail: InputThumbnail,
    userBackground: InputThumbnail    
  }

  type Comment {
    id: ID,
    userId: String,
    data: String,
    rating: String
  }

  input InputComment {
    id: ID,
    userId: String,
    data: String,
    rating: String
  }

  type Hotspot {
    id: ID,
    name: String,
    startPoint: Int
  }

  input InputHotspot {
    id: ID,
    name: String!,
    startPoint: Int!
  }

  type Overlay {
    id: ID,
    name: String,
    jumpPoint: Int,
    templateTitle: String,
    leftActionHotspot: ID,
    rightActionHotspot: ID
  }

  input InputOverlay {
    id: ID,
    name: String!,
    jumpPoint: Int!,
    templateTitle: String!,
    leftActionHotspot: ID!,
    rightActionHotspot: ID!
  }

  type Trigger {
    id: ID,
    type: String,
    name: String,
    startPoint: Int,
    skipTo: Int
  }

  input InputTrigger {
    id: ID,
    type: String!,
    name: String!,
    startPoint: Int!,
    skipTo: Int!
  }

  type PlayerOverlay {
    overlayId: ID,
    overlayTemplate: String,
    overlayName: String,
    jumpPoint: Int,
    templateTitle: String,
    templateLeftAction: Int,
    templateRightAction: Int,
    templateLeftLabel: String,
    templateRightLabel: String,
  }

  input InputPlayerOverlay {
    overlayId: ID,
    overlayTemplate: String,
    overlayName: String,
    jumpPoint: Int,
    templateTitle: String,
    templateLeftAction: Int,
    templateRightAction: Int,
    templateLeftLabel: String,
    templateRightLabel: String,
  }
  
  type Movie {
    id: ID,
    mId: String,
    title: String,
    description: String,
    url: String,
    thumbnails: Thumbnails,
    genre: String,
    rating: String,
    createdAt: Float,
    lastUpdated: String,
    publishedAt: String,
    isPublished: Boolean,
    editorId: ID,
    isFeatured: Boolean,
    comments: [Comment],
    watchlistedUsers: [String],
    hotspots: GraphQLJSONObject,
    overlays: GraphQLJSONObject,
    triggers: GraphQLJSONObject,
    interactiveData: GraphQLJSONObject
  }

  input InputMovie {
    id:ID,
    mId: ID,
    title: String,
    url: String!,
    description: String,
    thumbnails: InputThumbnails,
    genre: String,
    rating: String,
    isPublished: Boolean,
    createdAt: Float,
    isFeatured: Boolean,
    editorId: ID,
    publishedAt: String,
    comments: [InputComment],
    watchlistedUsers: [String],
    hotspots: GraphQLJSONObject,
    overlays: GraphQLJSONObject,
    triggers: GraphQLJSONObject,
    interactiveData: GraphQLJSONObject,
  }

  type Query {
    user(uid: ID!): User,
    users:[User],
    movies(
      userId: String
      queryText: String
      isPublished: Boolean
      isFeatured: Boolean
    ):[Movie],
    movie(id: ID!): Movie,
    getNewReleases(limit: Int): [Movie],
    getFeatured(limit: Int): [Movie],
    isWatchlisted(userId: ID!, movieId: ID!): Boolean
    getWatchlistedMovies(userId: ID!): [Movie]
    hotspot(id: ID!, movieId: ID!): Hotspot,
    overlay(id: ID!, movieId: ID!): Overlay,
    trigger(id: ID!, movieId: ID!): Trigger
    getInteractiveData(movieId: ID!): [PlayerOverlay]
  }

  type Mutation {
    createUser(
      uid: ID!,
      displayName: String!,
      email: String!,
      photoURL: String,
      emailVerified: Boolean
      ): User
    
    addMovie(
      mId: ID!,
      title: String!,
      editorId: ID!,
      url: String!,
      description: String,
      thumbnails: InputThumbnails,
      genre: String,
      rating: String,
      isPublished: Boolean,
      isFeatured: Boolean,
      comments: [InputComment],
      hotspots: GraphQLJSONObject,
      overlays: GraphQLJSONObject,
      triggers: GraphQLJSONObject,
    ): Movie,

    updateMovie(
      id: String!,
      data: InputMovie!
    ): Movie,

    addHotspot(
      data: InputHotspot!,
      movieId: ID!
    ): Hotspot,

    deleteHotspot(
      id: ID!,
      movieId: ID!
    ): String,

    addOverlay(
      data: InputOverlay!,
      movieId: ID!
    ): Overlay,

    deleteOverlay(
      id: ID!,
      movieId: ID!
    ): String,

    addTrigger(
      data: InputTrigger!,
      movieId: ID!
    ): Trigger,

    deleteTrigger(
      id: ID!,
      movieId: ID!
    ): String,

    addToWatchlist(
      userId: ID!,
      movieId: ID!
    ): ID,

    deleteFromWatchlist(
      userId: ID!,
      movieId: ID!
    ): ID,

    deleteMovie(
      movieId: ID!
    ): Movie,
  }
`;

module.exports = typeDefs;
