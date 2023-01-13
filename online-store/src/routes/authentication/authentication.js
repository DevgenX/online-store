import SignUpForm from "../../components/sign-up/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form";

import "./authentication.styles.scss";
// auth is a memory bank tracking authenticating states/firebase instances

const Authentication = () => {
  // the web is getting redirected so the state aren't getting logged into our website
  // we went from google redirect to our website

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
