import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocument,
} from "../utils/firebase/firebase.utils";
// as the actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// export context and provider
// passed-in as a prop to the app component through wrapping
// from app, we access it in the sign-up form
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // store currentUser when auth changed value is, Sign out = null, sign in = user object
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // createContext exposes the useState to wherever it will be used
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
