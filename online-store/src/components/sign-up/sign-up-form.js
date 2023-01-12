import { useState } from "react";

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
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit>
        <label>Username</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
