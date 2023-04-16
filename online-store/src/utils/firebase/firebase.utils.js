// creates an app based on a config
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
initializeApp(firebaseConfig);

// google auth provider is a class
const googleProvider = new GoogleAuthProvider();

// set parameters on the provider whenever the user interacts
// with the app, they will always select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// google auth provider is a class that we get from the class. connected to google
export const auth = getAuth();
// sign in with google pop up
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// sign in with google redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// GET DB ACCESS
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // set location with the value of the object itself
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
};

export const createUserDocument = async (userAuth, addInfo = {}) => {
  if (!userAuth) return;

  // see if there is an existing document reference
  // database, collection then unique identifier for the data
  // give me the user document in this database, inside the users collection with this uid
  const userDocRef = doc(db, "users", userAuth.uid);

  // get the user document
  const userData = await getDoc(userDocRef);

  // check if user data exists, if not create a user.
  if (!userData.exists()) {
    // get the data from the userAuth
    const { displayName, email } = userAuth;
    // set a date to be the current date
    const createdAt = new Date();
    // if not, use setDoc to data from userAuth in the collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addInfo,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  return userDocRef;
  // if true, return userDocRef
};

// create account using a form
export const createAccountWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in the user with email and password
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// sign out the user
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
