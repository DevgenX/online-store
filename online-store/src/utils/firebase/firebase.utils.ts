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
  NextOrObserver,
  User,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig2 = {
  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_APP_ID,

  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// // Initialize Firebase
initializeApp(firebaseConfig2);

const googleProvider = new GoogleAuthProvider();

// set parameters on the provider whenever the user interacts
// with the app, they will always select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// google auth provider is a class that we get from the class. connected to google
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // set location with the value of the object itself
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  // cast the value of what we're getting back with Category
  return querySnapshot.docs.map(
    (docSnapShot) => docSnapShot.data() as Category
  );
};

export type AddInfo = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocument = async (
  userAuth: User,
  addInfo = {} as AddInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("error creating the user", e);
    }
  }

  return userData as QueryDocumentSnapshot<UserData>;
};

export const createAccountWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
