import { Button, Typography } from "base-ui-react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";
import { useAlert } from "../../contexts/alert.context";
import formatCurrency from "../../utils/formatCurrencyToUs";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { showAlert } = useAlert();

  const addItemToCartHandler = () => {
    addItemToCart(product);
    showAlert({
      status: "success",
      message: `${name} has been added to your cart!`,
    });
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <Typography variant="label">{name}</Typography>
        <Typography variant="label">{formatCurrency(price)}</Typography>
      </div>
      <Button variant="secondary" onClick={addItemToCartHandler}>
        Add
      </Button>
    </div>
  );
};

export default ProductCard;
