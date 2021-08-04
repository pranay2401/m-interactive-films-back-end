function userProfile(data) {
  return {
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    photoURL: data.photoURL,
    emailVerified: data.emailVerified,
  };
}
module.exports = userProfile;
