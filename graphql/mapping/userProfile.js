function userProfile(data) {
  return {
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    photoURL: data.photoURL,
    emailVerified: data.emailVerified,
    watchlistedMovies: data.watchlistedMovies && Object.values(data.watchlistedMovies)
  };
}
module.exports = userProfile;
