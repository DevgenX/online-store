import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up/sign-up-form";

// auth is a memory bank tracking authenticating states/firebase instances

const SignIn = () => {
  const logGoogleUser = async () => {
    //destructured from the web response data
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocument(user);
  };

  // the web is getting redirected so the state aren't getting logged into our website
  // we went from google redirect to our website

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
