import { useContext } from "react";
import { Typography, Icon } from "base-ui-react";

import { CartContext } from "../../contexts/cart.context";
import formatCurrency from "../../utils/formatCurrencyToUs";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">
        <Typography variant="h4">{name}</Typography>{" "}
      </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          <Typography variant="small">&#10094;</Typography>
        </div>
        <span className="value">
          <Typography variant="p">{quantity}</Typography>
        </span>
        <div className="arrow" onClick={addItemHandler}>
          <Typography variant="small">&#10095;</Typography>
        </div>
      </span>
      <span className="price">
        <Typography variant="p">{formatCurrency(price)}</Typography>
      </span>
      <div className="remove-button" onClick={clearItemHandler}>
        <Icon variant="cross" />
      </div>
    </div>
  );
};

export default CheckoutItem;
