import { AnyAction } from "redux";
import { CartItem } from "./cart.types";

import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = initialState,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
