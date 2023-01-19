import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product to add

  // check if the item already exists

  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  // if it does, increment the count
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

  // just return the cart with modified items / count
  return [...cartItems, { ...productToAdd, quantity: 1 }];
  // new cart item
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  // if the item id is equal to the cartItem id, remove it from the cart.
  if (existingCartItem.quantity === 1) {
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

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

// create context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  // add the data to the add to cart popup
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // reduce takes two arguments, a callback and starting value
  // total is accumulator
  // cartItem is the current item
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    // setCartItems will set the value of cartItem to whatever the evaluted result of the callback
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  // we need both cause we will be flipping the value later
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
