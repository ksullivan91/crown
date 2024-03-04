// hooks/useGoogleSignIn.js
import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserProfileDocumentFromAuth,
} from "../utils/firebase/firebase.utils"; // Update the import path as needed
import getAuthErrorMessage from "../utils/firebase/authErrorHandling";

const useGoogleSignIn = () => {
  const [error, setError] = useState("");

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserProfileDocumentFromAuth(user);
      setError("");
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error);
      setError(errorMessage);
      console.error("Error signing in", error);
    }
  };

  return { logGoogleUser, error };
};

export default useGoogleSignIn;
