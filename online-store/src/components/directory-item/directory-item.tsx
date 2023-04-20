import { useNavigate } from "react-router-dom";
import { FC } from "react";

import {
  BackGroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

import { DirectoryCategory } from "../categories/directory.js";

type DirectoryCategoryProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryCategoryProps> = ({ category }) => {
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
