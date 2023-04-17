import { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FormContainer,
  PaymentFormContainer,
  PaymentButton,
} from "./payment-form.styles";

import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPES } from "../button/button-component";
import PaymentModal from "./payment-modal";

const PaymentForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <PaymentFormContainer>
      <FormContainer>
        {showModal && <PaymentModal />}

        <PaymentButton buttonType={BUTTON_TYPES.inverted} onClick={handleModal}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
