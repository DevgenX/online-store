import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }
  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);

  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);

  return setCartItems(newCartItems);
};
