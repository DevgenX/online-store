import { useNavigate } from "react-router-dom";

import {
  BackGroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

// destructured the category in the parameters
// it is equal to { category } = this.props
// then imageUrl, title are destructured from category object
const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackGroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
