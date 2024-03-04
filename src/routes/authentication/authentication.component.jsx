import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import { UserContext } from "../../contexts/user.context";

import "./authentication.styles.scss";

const Authentication = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      // Redirect to the home page or a previous page
      // If there's no state or from pathname, redirect to the root/home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location.state]);

  return (
    <div className="authentication">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
