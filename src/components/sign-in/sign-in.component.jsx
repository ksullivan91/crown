import React, { useState, useEffect, useContext } from "react";
import { Button, TextInput, Typography } from "base-ui-react";
import {
  signInWithEmailAndPasswordAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import getAuthErrorMessage from "../../utils/firebase/authErrorHandling";

import "./sign-in.styles.scss";

const SignInForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { email, password } = formValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await signInWithEmailAndPasswordAuth(email, password);
      if (response.user) {
      }
    } catch (error) {
      setError(getAuthErrorMessage(error));
      console.error("Error signing in:", error);
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
    <div className="sign-in-form">
      <Typography variant="h3">I already have an account</Typography>
      <Typography variant="label">
        Sign in with your email and password
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          labelText="Email"
          required
        />
        <TextInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          labelText="Password"
          required
        />
        <div className="buttons" style={{ display: "flex" }}>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
          <Button type="button" onClick={logGoogleUser} variant="secondary">
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
