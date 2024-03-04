import { Button, Typography } from "base-ui-react";
import SignUpForm from "../../components/sign-up/sign-up.component";
import {
  signInWithGooglePopup,
  createUserProfileDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(auth);
    const userDocRef = await createUserProfileDocumentFromAuth(user);
    console.log(userDocRef);
  };
  return (
    <div>
      <Typography variant="h3">Sign In</Typography>
      <Button onClick={logGoogleUser} variant="secondary">Sign In with Google</Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
