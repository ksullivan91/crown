import React, { useState, useEffect, useContext } from "react";
import { Button, TextInput, Typography } from "base-ui-react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import getAuthErrorMessage from "../../utils/firebase/authErrorHandling";

import "./sign-up.styles.scss";

const SignUpForm = () => {
  const initialFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialFormFields);
  const [error, setError] = useState("");
  const { displayName, email, password, confirmPassword } = formValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetFormFields = () => {
    setFormValues(initialFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      const userRef = await createUserProfileDocumentFromAuth(user, {
        displayName,
      });
      console.log(userRef);
      resetFormFields();
    } catch (e) {
      setError(getAuthErrorMessage(e)); // Use utility function for error handling
      console.error("Error creating account:", e);
    }
  };

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (e) {
      const errorMessage = getAuthErrorMessage(e);
      setError(errorMessage);
      console.error("Error signing in", e);
    }
  };

  return (
    <div className="sign-up-form">
      <Typography variant="h3">Don't have an account?</Typography>
      <Typography variant="label">
        Sign Up with your email and password
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextInput
          name="displayName"
          value={displayName}
          onChange={handleChange}
          labelText="Display Name"
          type="text"
          required
        />
        <TextInput
          name="email"
          value={email}
          onChange={handleChange}
          labelText="Email"
          type="email"
          required
        />
        <TextInput
          name="password"
          value={password}
          onChange={handleChange}
          labelText="Password"
          type="password"
          required
        />
        <TextInput
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          labelText="Confirm Password"
          type="password"
          required
        />
        <div
          className="buttons"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button type="submit">Sign Up</Button>
          <Button onClick={logGoogleUser} variant="secondary">
            Sign Up with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
