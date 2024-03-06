import { useContext } from "react";
import { Typography } from "base-ui-react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-teim/checkout-item.component";
import formatCurrency from "../../utils/formatCurrencyToUs";

import "./checkout.styles.scss";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <Typography variant="label">Product</Typography>
        </div>
        <div className="header-block">
          <Typography variant="label">Description</Typography>
        </div>
        <div className="header-block">
          <Typography variant="label">Quantity</Typography>
        </div>
        <div className="header-block">
          <Typography variant="label">Price</Typography>
        </div>
        <div className="header-block">
          <Typography variant="label">Remove</Typography>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <Typography variant="h3">TOTAL: {formatCurrency(cartTotal)}</Typography>
      </div>
      <PaymentForm />
    </div>
  );
};

export default Checkout;
