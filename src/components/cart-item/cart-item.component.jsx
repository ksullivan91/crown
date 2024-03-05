import { useHover, Icon } from "base-ui-react";
import formatCurrency from "../../utils/formatCurrencyToUs";
import "./cart-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartItem = ({ item }) => {
  const [hoverRef, isHovered] = useHover();
  const { clearItemFromCart } = useContext(CartContext);
  const { imageUrl, price, name, quantity } = item;

  const clearItemHandler = () => {
    clearItemFromCart(item);
  };
  return (
    <div className="cart-item-container" ref={hoverRef}>
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {formatCurrency(price)}
        </span>
      </div>
      {isHovered && (
        <div className="remove-button" onClick={clearItemHandler}>
          <Icon variant="cross" />
        </div>
      )}
    </div>
  );
};

export default CartItem;
