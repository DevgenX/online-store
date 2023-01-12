import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    //destructured from the web response data
    const { user } = await signInWithGooglePopup();
    createUserDocument(user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
