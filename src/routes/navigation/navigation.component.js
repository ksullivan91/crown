import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { TextLink } from "base-ui-react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Cart from "../../components/cart/cart.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            <TextLink>Shop</TextLink>
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutHandler}>
              <TextLink>Sign out</TextLink>
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              <TextLink>Sign in</TextLink>
            </Link>
          )}
          <Cart />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
