import {
  CheckOutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const handleClearItem = () => clearItemFromCart(cartItem);
  const handleAddItem = () => addItemToCart(cartItem);
  const handleRemoveItem = () => removeItemToCart(cartItem);

  return (
    <CheckOutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan className="name">{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={handleRemoveItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAddItem}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={handleClearItem}>&#10005;</RemoveButton>
    </CheckOutItemContainer>
  );
};
export default CheckoutItem;
