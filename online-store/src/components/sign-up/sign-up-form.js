import { useState } from "react";

import SignInput from "../form-input/form-input";
import Button from "../button/button-component";

import {
  createAccountWithEmailAndPassword,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.scss";

const initialFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // build a state function with the default value set as the initialFormField object above

  const [formField, setFormField] = useState(initialFormField);
  // destructure the formfield object to use them in a function later
  const { displayName, email, password, confirmPassword } = formField;

  const resetForm = () => {
    setFormField(initialFormField);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // returns the create with email and password method
      const { user } = await createAccountWithEmailAndPassword(email, password);
      // add the user to the database

      await createUserDocument(user, { displayName });
      resetForm();
    } catch (err) {
      // show error when the email is already in the database
      if (err.code === "auth/email-already-in-use") {
        alert("Error: Username or email already in use");
      } else {
        console.log("Error creating user", err.message);
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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <SignInput
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <SignInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
