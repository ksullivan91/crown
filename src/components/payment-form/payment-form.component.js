import { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Typography } from "base-ui-react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import formatCurrency from "../../utils/formatCurrencyToUs";
import { useAlert } from "../../contexts/alert.context";
import "./payment-form.styles.scss";
import SpinnerIcon from "../spinner-icon/spinner-icon.components";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useContext(UserContext);
  const { cartTotal, clearAllItemsFromCart } = useContext(CartContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error) => {
    setIsLoading(false);
    const message =
      typeof error === "string"
        ? error
        : error.message ||
          "There was an issue with your payment. Please try again.";
    console.error(message); // Log the error message for debugging
    showAlert({
      status: "error",
      message: message,
    });
  };

  const handlePaymentSuccess = () => {
    setIsLoading(false);
    clearAllItemsFromCart();
    showAlert({
      status: "success",
      message: "Payment successful",
    });
    navigate("/shop");
  };

  const paymentHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    if (!stripe || !elements) {
      console.log("Stripe has not initialized");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log("CardElement not found");
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal * 100 }), // Convert cart total to cents
      });

      if (!response.ok) {
        handleError(`HTTP error! Status: ${response.status}`);
        return;
      }

      const {
        paymentIntent: { client_secret },
      } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentUser?.displayName || "Guest",
          },
        },
      });

      if (paymentResult.error) {
        handleError(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        handlePaymentSuccess();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <Typography variant="h4">Credit Card Payment</Typography>
        <CardElement />
        <Button variant="alternative" type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerIcon /> : `Pay ${formatCurrency(cartTotal)}`}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
