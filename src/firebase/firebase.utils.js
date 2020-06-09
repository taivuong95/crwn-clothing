import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyARsV5WyuugIHXOjo60wWax_8e_JSOQqAU",
  authDomain: "crwn-db-21204.firebaseapp.com",
  databaseURL: "https://crwn-db-21204.firebaseio.com",
  projectId: "crwn-db-21204",
  storageBucket: "crwn-db-21204.appspot.com",
  messagingSenderId: "233858940536",
  appId: "1:233858940536:web:df032d627f503e8fa6378d",
  measurementId: "G-XKSSSRPB3W",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
