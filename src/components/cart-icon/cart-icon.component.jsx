import { Icon } from "base-ui-react";

import "./cart-icon.styles.scss";
import { Typography } from "base-ui-react";

const CartIcon = ({ count }) => {
  return (
    <div className="cart-icon">
      <Icon variant={"cart"} className="shopping-icon" />
      {count > 0 ? (
        <span className="item-count">
          <Typography variant="label">{count}</Typography>
        </span>
      ) : null}
    </div>
  );
};

export default CartIcon;
