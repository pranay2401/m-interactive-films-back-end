function userProfile(data) {
  return {
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    photoURL: data.photoURL,
    emailVerified: data.emailVerified,
    editedMovies: data.editedMovies && Object.values(data.editedMovies),
    watchlistedMovies: data.watchlistedMovies && Object.values(data.watchlistedMovies)
  };
}
module.exports = userProfile;
