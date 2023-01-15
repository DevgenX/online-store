import { createContext, useState } from "react";

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

  // createContext exposes the useState to wherever it will be used
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
