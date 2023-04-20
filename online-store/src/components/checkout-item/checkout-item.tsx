import {
  CheckOutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const handleClearItem = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const handleAddItem = () => dispatch(addItemToCart(cartItems, cartItem));

  const handleRemoveItem = () =>
    dispatch(removeItemToCart(cartItems, cartItem));

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
