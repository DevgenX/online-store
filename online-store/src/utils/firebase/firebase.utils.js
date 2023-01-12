// creates an app based on a config
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkMhduJ9VGLZ7E-z7Scqfw7QEdLTfK4Ds",
  authDomain: "degenr8store.firebaseapp.com",
  projectId: "degenr8store",
  storageBucket: "degenr8store.appspot.com",
  messagingSenderId: "557576287105",
  appId: "1:557576287105:web:65c3e12773bc720d882e80",
  measurementId: "G-T20PDFS8ES",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// google auth provider is a class
const provider = new GoogleAuthProvider();

// set parameters on the provider whenever the user interacts
// with the app, they will always select an account
provider.setCustomParameters({
  prompt: "select_account",
});

// google auth provider is a class that we get from the class. connected to google
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocument = async (userAuth) => {
  // see if there is an existing document reference
  // database, collection then unique identifier for the data
  // give me the user document in this database, inside the users collection with this uid
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // get the user document
  const userData = await getDoc(userDocRef);
  console.log(userData);
  console.log(userData.exists());

  // check if user data exists, if not create a user.
  if (!userData.exists()) {
    // get the data from the userAuth
    const { displayName, email } = userAuth;
    // set a date to be the current date
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  // if not, use setDoc to with data from userAuth in the collection
  return userDocRef;
  // if true, return userDocRef
};
