import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.components";

const Cart = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  return (
    <div>
      <div onClick={() => setIsCartOpen(!isCartOpen)}>
      <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
  );
};

export default Cart;
