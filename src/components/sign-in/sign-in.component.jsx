import React, { useState, useEffect } from "react";
import { Button, TextInput, Typography } from "base-ui-react";
import { signInWithEmailAndPasswordAuth } from "../../utils/firebase/firebase.utils";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import getAuthErrorMessage from "../../utils/firebase/authErrorHandling";

import "./sign-in.styles.scss";

const SignInForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { logGoogleUser, googleError } = useGoogleSignIn();
  const { email, password } = formValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any existing error
    try {
      await signInWithEmailAndPasswordAuth(email, password);
    } catch (error) {
      setError(getAuthErrorMessage(error));
      console.error("Error signing in:", error);
    }
  };

  // Listen for changes in the Google sign-in error and set it if present
  useEffect(() => {
    if (googleError) {
      setError(googleError);
    }
  }, [googleError]);

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
