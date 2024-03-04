import { Button, TextInput, Typography } from "base-ui-react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up.styles.scss";

const formFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(formFields);
  const [error, setError] = useState('');
  const { displayName, email, password, confirmPassword } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetFormFields = () => {
    setFormValues(formFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserProfileDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error("User creation error", error);
    }
  };

  return (
    <div className="sign-up-form">
      <Typography variant="h3">Don't have an account?</Typography>
      <Typography variant="label">Sign Up with your email and password</Typography>
      <form onSubmit={handleSubmit}>
        {error && <Typography color="error">{error}</Typography>}
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
