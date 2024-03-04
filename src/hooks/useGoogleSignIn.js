import { useContext, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import {
  signInWithGooglePopup,
  createUserProfileDocumentFromAuth,
} from "../utils/firebase/firebase.utils"; // Update the import path as needed
import getAuthErrorMessage from "../utils/firebase/authErrorHandling";

const useGoogleSignIn = () => {
  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();

    } catch (error) {
      return getAuthErrorMessage(error);
    }
  };

  return { logGoogleUser };
};

export default useGoogleSignIn;
