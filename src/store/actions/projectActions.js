export const createProject = (story, authId, profile) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("profile", story);
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("stories")
      .add({
        ...story,
        title: story.title,
        content: story.content,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_STORIES_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_STORIES_ERROR" }, err);
      });
  };
};

export const updateProfile = (authId, profile) => {
  console.log(" const firestore = getFirestore();", authId, profile);
  return (dispatch, getState, { getFirestore }) => {
    console.log("profile", authId, profile);
    // make async call to database
    const firestore = getFirestore();
    firestore.collection("users").doc(authId).update({ profilePic: profile });
    dispatch({ type: "UPDATE_USER_SUCCESS" });
  };
};
