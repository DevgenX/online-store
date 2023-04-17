import { useState } from "react";
import { useDispatch } from "react-redux";

import SignInput from "../form-input/form-input";
import Button, { BUTTON_TYPES } from "../button/button-component";
import { useNavigate } from "react-router";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import { SignInContainer, ButtonContainer } from "./sign-in-form.jsx";

const initialFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // build a state function with the default value set as the initialFormField object above

  const [formField, setFormField] = useState(initialFormField);
  // destructure the formfield object to use them in a function later
  const { email, password } = formField;

  const resetForm = () => {
    setFormField(initialFormField);
  };

  const signInWithGoogle = async () => {
    //destructured from the web response data
    dispatch(googleSignInStart());
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      navigate("/");
      resetForm();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("Email not found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    // gets the name from e.target.name
    // gets the value from e.target.value
    const { name, value } = e.target;

    // spread in the object using spread parameter then update
    // update the appropriate field using bracket notation
    // assign the value of it to be the value from e.target
    setFormField({ ...formField, [name]: value });
  };
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <SignInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <SignInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES.google}
            onClick={signInWithGoogle}
          >
            GOOGLE SIGN IN
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;

// type button removes the default type value of submit button
