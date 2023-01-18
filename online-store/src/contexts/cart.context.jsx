import { createContext, useState } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  // add the data to the add to cart popup
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    // setCartItems will set the value of cartItem to whatever the evaluted result of the callback
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  // we need both cause we will be flipping the value later
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
