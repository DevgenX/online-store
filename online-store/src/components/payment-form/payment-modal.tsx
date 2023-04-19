import styled from "styled-components";
import { useState, MouseEvent } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { PaymentButton } from "./payment-form.styles";

import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPES } from "../button/button-component";

const isValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentModal = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const cardDetails = elements.getElement(CardElement);

    if (!isValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Anonymous",
        },
      },
    });
    setIsProcessing(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };
  return (
    <ModalContainer>
      <h2>Pay with credit card</h2>
      <CardContainer>
        <CardElement />
      </CardContainer>
      <PaymentButton
        buttonType={BUTTON_TYPES.inverted}
        isLoading={isProcessing}
        onClick={paymentHandler}
      >
        Confirm
      </PaymentButton>
    </ModalContainer>
  );
};
export default PaymentModal;

const ModalContainer = styled.div`
  margin: 10px;
  padding: 10px;
  width: 50%;
  background: white;
  color: black;
  border-radius: 10px;
`;

const CardContainer = styled.div`
  color: white;
`;
