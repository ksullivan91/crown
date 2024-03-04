import { Icon } from "base-ui-react";

import "./cart-icon.styles.scss";

const CartIcon = ({ count }) => {
  return (
    <div className="cart-icon">
      <Icon variant={"cart"} className="shopping-icon" />
      {count > 0 ? <span className="item-count">{count}</span> : null}
    </div>
  );
};

export default CartIcon;
