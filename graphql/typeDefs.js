const typeDefs = `
  type User {
    uid: ID
    displayName: String
    email: String
    photoURL: String
    emailVerified: Boolean
  }

  input Thumbnail {
    url: String,
    height: Int,
    width: Int
  }

  input Thumbnails {
    default: Thumbnail,    
    medium: Thumbnail,    
    high: Thumbnail,    
    standard: Thumbnail,    
    maxres: Thumbnail,    
  }

  input Comment {
    userId: String,
    data: String,
    rating: String
  }

  input Hotspot {
    id: String,
    name: String,
    startpoint: Int
  }

  input Overlay {
    id: String,
    name: String,
    jumpPoint: Int,
    templateActionId: String
  }

  input Trigger {
    id: String,
    type: String,
    name: String,
    startPoint: Int,
    skipTo: Int
  }

  input Template {
    id: String,
    title: String,
    noOfHotspots: Int
  }

  
  input PlayerOverlay {
    overlayId: String,
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
    name: String,
    title: String,
    description: String,
    url: String,
    thumbnails: Thumbnails,
    genre: String,
    rating: String,
    createdOn: String,
    publishedAt: String,
    isPublished: Boolean,
    publisher: String,
    isFeatured: Boolean,
    comments: [Comment],
    watchlistedUsers: [String],
    hotspots: [Hotspot],
    overlays: [Overlay],
    triggers: [Trigger],
    interactiveData: [PlayerOverlay]
  }

  type Query {
    hello(name: String): String!,
    user(uid: ID!): User,
    users:[User],
    movies:[Movie],
    movie(uid: ID!): Movie
  }

  type Mutation {
    createUser(
      displayName: String!,
      email: String!,
      photoURL: String,
      emailVerified: Boolean
      ): User
    
    addMovie(
      id: ID,
      name: String!,
      title: String!,
      description: String!,
      url: String!,
      thumbnails: Thumbnails,
      genre: String,
      rating: String,
      createdOn: String,
      publishedAt: String,
      isPublished: Boolean,
      publisher: String,
      isFeatured: Boolean,
      comments: [Comment],
      watchlistedUsers: [String],
      hotspots: [Hotspot],
      overlays: [Overlay],
      triggers: [Trigger],
      interactiveData: [PlayerOverlay]
    ): Movie
  }
`;

module.exports = typeDefs;
