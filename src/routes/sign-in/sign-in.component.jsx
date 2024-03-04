import { signInWithGooglePopup, createUserProfileDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocumentFromAuth(user);
    console.log(userDocRef);
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  )
}

export default SignIn;