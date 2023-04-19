import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import SignInput from "../form-input/form-input";
import Button, { BUTTON_TYPES } from "../button/button-component";
import { useNavigate } from "react-router";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

import { SignInContainer, ButtonContainer } from "./sign-in-form.styles";

const initialFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formField, setFormField] = useState(initialFormField);

  const { email, password } = formField;

  const resetForm = () => {
    setFormField(initialFormField);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    navigate("/");
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      navigate("/");
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
