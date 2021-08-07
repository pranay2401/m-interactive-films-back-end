const typeDefs = `
  type User {
    uid: ID
    displayName: String
    email: String
    photoURL: String
    emailVerified: Boolean
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
  }

  input InputThumbnails {
    default: InputThumbnail,    
    medium: InputThumbnail,    
    high: InputThumbnail,    
    standard: InputThumbnail,    
    maxres: InputThumbnail,    
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
    name: String,
    startPoint: Int
  }

  type Overlay {
    id: ID,
    name: String,
    jumpPoint: Int,
    templateActionId: String
  }

  input InputOverlay {
    id: ID,
    name: String,
    jumpPoint: Int,
    templateActionId: String
  }

  type TemplateAction {
    id: ID,
    title: String,
    leftHotspotId: String,
    rightHotspotId: String,
  }

  input InputTemplateAction {
    id: ID,
    title: String,
    leftHotspotId: String,
    rightHotspotId: String,
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
    type: String,
    name: String,
    startPoint: Int,
    skipTo: Int
  }

  type Template {
    id: ID,
    title: String,
    noOfHotspots: Int
  }

  input InputTemplate {
    id: ID,
    title: String,
    noOfHotspots: Int
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
    mId: ID,
    name: String,
    title: String,
    description: String,
    url: String,
    thumbnails: Thumbnails,
    genre: String,
    rating: String,
    createdOn: String,
    lastUpdated: String,
    publishedAt: String,
    isPublished: Boolean,
    editorId: ID,
    isFeatured: Boolean,
    comments: [Comment],
    watchlistedUsers: [String],
    hotspots: [Hotspot],
    overlays: [Overlay],
    triggers: [Trigger],
    templateActions: [TemplateAction],
    interactiveData: [PlayerOverlay]
  }

  type Query {
    hello(name: String): String!,
    user(uid: ID!): User,
    users:[User],
    movies:[Movie],
    movie(mId: ID!): Movie
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
      name: String,
      description: String,
      thumbnails: InputThumbnails,
      genre: String,
      rating: String,
      isPublished: Boolean,
      isFeatured: Boolean,
      comments: [InputComment],
      hotspots: [InputHotspot],
      overlays: [InputOverlay],
      triggers: [InputTrigger],
      templateActions: [InputTemplateAction],
    ): Movie
  }
`;

module.exports = typeDefs;
