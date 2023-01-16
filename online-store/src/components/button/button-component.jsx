import "./button.styles.scss";
import React from "react";

const ButtonTypes = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${ButtonTypes[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
