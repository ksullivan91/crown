import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.components";
import ClickAwayListener from "../../hooks/clickAwayListener";

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <div onClick={toggleCartHandler}>
        <CartIcon count={cartCount} />
      </div>
      <ClickAwayListener onClickAway={toggleCartHandler} isOpen={isCartOpen}>
        <CartDropdown />
      </ClickAwayListener>
    </div>
  );
};

export default Cart;
